export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function error(message, status = 400) {
  return json({ error: message }, status);
}

export function cityKeyFor(label) {
  return label.trim().toLowerCase().replace(/\s+/g, '-');
}

export function rowToRestaurant(row) {
  return {
    id: row.id,
    city: row.city,
    cityLabel: row.city_label,
    state: row.state,
    name: row.name,
    type: row.type,
    tags: JSON.parse(row.tags || '[]'),
    badges: JSON.parse(row.badges || '[]'),
    chase: row.chase,
    resNote: row.res_note,
    desc: row.desc,
    links: JSON.parse(row.links || '[]'),
    visited: !!row.visited,
    rating: row.rating,
    notes: row.notes,
    reservationBooked: !!row.reservation_booked,
    reservationDate: row.reservation_date,
  };
}
