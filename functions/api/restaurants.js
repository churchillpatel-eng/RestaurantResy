import { json, error, cityKeyFor, rowToRestaurant } from '../_utils.js';

const LIST_SQL = `
  SELECT r.*, n.visited, n.rating, n.notes, n.updated_at AS notes_updated_at,
    (SELECT MIN(res.reservation_datetime) FROM reservations res
     WHERE res.restaurant_id = r.id AND res.reservation_datetime >= datetime('now')) AS next_reservation
  FROM restaurants r
  LEFT JOIN notes n ON n.restaurant_id = r.id
  ORDER BY r.state, r.city_label, r.name COLLATE NOCASE
`;

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(LIST_SQL).all();
  const cities = await env.DB.prepare('SELECT * FROM cities').all();
  return json({
    restaurants: results.map(rowToRestaurant),
    cities: cities.results,
  });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const { name, cityLabel, state, type, tags } = body;

  if (!name || !name.trim()) return error('Restaurant name is required');
  if (!cityLabel || !cityLabel.trim()) return error('City is required');

  const cityKey = cityKeyFor(cityLabel);
  const resolvedState = (state && state.trim()) || 'New Mexico';

  const existingCity = await env.DB.prepare('SELECT * FROM cities WHERE city_key = ?').bind(cityKey).first();
  if (!existingCity) {
    await env.DB.prepare(
      'INSERT INTO cities (label, city_key, state, cls, emoji, dates) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(cityLabel.trim(), cityKey, resolvedState, '', '', '').run();
  }

  const id = crypto.randomUUID();
  const finalState = existingCity ? existingCity.state : resolvedState;
  const finalCityLabel = existingCity ? existingCity.label : cityLabel.trim();

  await env.DB.prepare(`
    INSERT INTO restaurants (id, city, city_label, state, name, type, tags, badges, chase, res_note, desc, links)
    VALUES (?, ?, ?, ?, ?, ?, ?, '[]', NULL, NULL, ?, '[]')
  `).bind(
    id, cityKey, finalCityLabel, finalState, name.trim(), type || '', JSON.stringify(tags || []), body.desc || ''
  ).run();

  await env.DB.prepare(
    'INSERT INTO notes (restaurant_id, visited, rating, notes) VALUES (?, 0, NULL, NULL)'
  ).bind(id).run();

  return json({ id }, 201);
}
