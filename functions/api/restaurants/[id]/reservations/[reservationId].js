import { json, error } from '../../../../_utils.js';

export async function onRequestDelete({ env, params }) {
  const result = await env.DB.prepare(
    'DELETE FROM reservations WHERE id = ? AND restaurant_id = ?'
  ).bind(params.reservationId, params.id).run();

  if (!result.meta.changes) return error('Reservation not found', 404);
  return json({ ok: true });
}
