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

// Converts a <input type="datetime-local"> value ("2026-07-14T19:30") into a
// format directly comparable/sortable against SQLite's datetime('now')
// output ("2026-07-14 19:30:00") — space instead of "T", seconds included.
export function toSqlDatetime(localDatetime) {
  if (!localDatetime) return null;
  const withSeconds = localDatetime.length === 16 ? localDatetime + ':00' : localDatetime;
  return withSeconds.replace('T', ' ');
}

// Inverse of toSqlDatetime, for handing a value back to a datetime-local input.
export function toLocalDatetimeInput(sqlDatetime) {
  if (!sqlDatetime) return '';
  return sqlDatetime.replace(' ', 'T').slice(0, 16);
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
    notesUpdatedAt: row.notes_updated_at,
    nextReservation: row.next_reservation || null,
  };
}
