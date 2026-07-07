import { json, error } from '../../../_utils.js';

export async function onRequestGet({ env, params }) {
  const { results } = await env.DB.prepare(
    'SELECT id, r2_key, uploaded_at FROM photos WHERE restaurant_id = ? ORDER BY uploaded_at'
  ).bind(params.id).all();

  return json(results.map(p => ({ id: p.id, url: `/api/photos/${p.r2_key}`, uploadedAt: p.uploaded_at })));
}

export async function onRequestPost({ request, env, params }) {
  const existing = await env.DB.prepare('SELECT id FROM restaurants WHERE id = ?').bind(params.id).first();
  if (!existing) return error('Restaurant not found', 404);

  const form = await request.formData();
  const file = form.get('photo');
  if (!file || typeof file === 'string') return error('No photo file provided');
  if (!file.type.startsWith('image/')) return error('File must be an image');
  if (file.size > 8 * 1024 * 1024) return error('Image must be under 8MB');

  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const photoId = crypto.randomUUID();
  const r2Key = `${params.id}/${photoId}.${ext}`;

  await env.PHOTOS.put(r2Key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  await env.DB.prepare(
    'INSERT INTO photos (id, restaurant_id, r2_key) VALUES (?, ?, ?)'
  ).bind(photoId, params.id, r2Key).run();

  return json({ id: photoId, url: `/api/photos/${r2Key}` }, 201);
}
