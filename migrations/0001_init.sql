CREATE TABLE restaurants (
  id         TEXT PRIMARY KEY,
  city       TEXT NOT NULL,
  city_label TEXT NOT NULL,
  state      TEXT NOT NULL,
  name       TEXT NOT NULL,
  type       TEXT,
  tags       TEXT NOT NULL DEFAULT '[]',   -- JSON array of strings
  badges     TEXT NOT NULL DEFAULT '[]',   -- JSON array of {cls, text}
  chase      TEXT,
  res_note   TEXT,
  desc       TEXT,
  links      TEXT NOT NULL DEFAULT '[]',   -- JSON array of {cls, href, text}
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE cities (
  label TEXT PRIMARY KEY,
  city_key TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  cls TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '',
  dates TEXT NOT NULL DEFAULT ''
);

CREATE TABLE notes (
  restaurant_id TEXT PRIMARY KEY REFERENCES restaurants(id) ON DELETE CASCADE,
  visited    INTEGER NOT NULL DEFAULT 0,
  rating     INTEGER,                     -- 1-5, nullable
  notes      TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE photos (
  id            TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  r2_key        TEXT NOT NULL,
  uploaded_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_restaurants_city ON restaurants(city);
CREATE INDEX idx_photos_restaurant ON photos(restaurant_id);
