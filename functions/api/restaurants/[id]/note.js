import { json, error } from '../../../_utils.js';

export async function onRequestPut({ request, env, params }) {
  const existing = await env.DB.prepare('SELECT id FROM restaurants WHERE id = ?').bind(params.id).first();
  if (!existing) return error('Restaurant not found', 404);

  const body = await request.json();
  const visited = body.visited ? 1 : 0;
  const rating = (body.rating === null || body.rating === undefined) ? null : Math.max(1, Math.min(5, Number(body.rating)));
  const notes = body.notes ?? null;
  const reservationBooked = body.reservationBooked ? 1 : 0;
  const reservationDate = body.reservationDate || null;

  await env.DB.prepare(`
    INSERT INTO notes (restaurant_id, visited, rating, notes, reservation_booked, reservation_date, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(restaurant_id) DO UPDATE SET
      visited = excluded.visited,
      rating = excluded.rating,
      notes = excluded.notes,
      reservation_booked = excluded.reservation_booked,
      reservation_date = excluded.reservation_date,
      updated_at = excluded.updated_at
  `).bind(params.id, visited, rating, notes, reservationBooked, reservationDate).run();

  return json({ ok: true });
}
