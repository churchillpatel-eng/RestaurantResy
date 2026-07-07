import { json, error, toSqlDatetime } from '../../../_utils.js';

export async function onRequestGet({ env, params }) {
  const { results } = await env.DB.prepare(
    'SELECT id, reservation_datetime FROM reservations WHERE restaurant_id = ? ORDER BY reservation_datetime DESC'
  ).bind(params.id).all();

  return json(results.map(r => ({ id: r.id, datetime: r.reservation_datetime })));
}

export async function onRequestPost({ request, env, params }) {
  const existing = await env.DB.prepare('SELECT id FROM restaurants WHERE id = ?').bind(params.id).first();
  if (!existing) return error('Restaurant not found', 404);

  const body = await request.json();
  if (!body.datetime) return error('A reservation date and time is required');

  const id = crypto.randomUUID();
  const sqlDatetime = toSqlDatetime(body.datetime);

  await env.DB.prepare(
    'INSERT INTO reservations (id, restaurant_id, reservation_datetime) VALUES (?, ?, ?)'
  ).bind(id, params.id, sqlDatetime).run();

  return json({ id, datetime: sqlDatetime }, 201);
}
