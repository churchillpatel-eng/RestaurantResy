import { json, error, rowToRestaurant } from '../../_utils.js';

const ONE_SQL = `
  SELECT r.*, n.visited, n.rating, n.notes
  FROM restaurants r
  LEFT JOIN notes n ON n.restaurant_id = r.id
  WHERE r.id = ?
`;

export async function onRequestGet({ env, params }) {
  const row = await env.DB.prepare(ONE_SQL).bind(params.id).first();
  if (!row) return error('Restaurant not found', 404);

  const photos = await env.DB.prepare(
    'SELECT id, r2_key FROM photos WHERE restaurant_id = ? ORDER BY uploaded_at'
  ).bind(params.id).all();

  return json({
    ...rowToRestaurant(row),
    photos: photos.results.map(p => ({ id: p.id, url: `/api/photos/${p.r2_key}` })),
  });
}

export async function onRequestPatch({ request, env, params }) {
  const existing = await env.DB.prepare('SELECT id FROM restaurants WHERE id = ?').bind(params.id).first();
  if (!existing) return error('Restaurant not found', 404);

  const body = await request.json();
  const fields = ['name', 'type', 'desc', 'chase', 'res_note'];
  const updates = [];
  const values = [];

  for (const f of fields) {
    const key = f === 'res_note' ? 'resNote' : f;
    if (body[key] !== undefined) {
      updates.push(`${f} = ?`);
      values.push(body[key]);
    }
  }
  if (body.tags !== undefined) { updates.push('tags = ?'); values.push(JSON.stringify(body.tags)); }
  if (body.links !== undefined) { updates.push('links = ?'); values.push(JSON.stringify(body.links)); }
  if (body.badges !== undefined) { updates.push('badges = ?'); values.push(JSON.stringify(body.badges)); }

  if (!updates.length) return error('No fields to update');

  values.push(params.id);
  await env.DB.prepare(`UPDATE restaurants SET ${updates.join(', ')} WHERE id = ?`).bind(...values).run();
  return json({ ok: true });
}
