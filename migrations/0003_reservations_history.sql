CREATE TABLE reservations (
  id TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  reservation_datetime TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_reservations_restaurant ON reservations(restaurant_id);

ALTER TABLE notes DROP COLUMN reservation_booked;
ALTER TABLE notes DROP COLUMN reservation_date;
