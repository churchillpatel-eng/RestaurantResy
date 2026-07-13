// ─── STATE ──────────────────────────────────────────────────────────────────────
// All content now lives in D1 (via /api/*), fetched at load time. Adding a
// restaurant is an API call from the "Add Restaurant" form, not a code edit.

let ALL_RESTAURANTS = [];
let ALL_CITIES = [];
let currentFilter = 'all';

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

async function api(path, opts) {
  const res = await fetch(path, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.status === 204 ? null : res.json();
}

async function loadData() {
  const data = await api('/api/restaurants');
  ALL_RESTAURANTS = data.restaurants;
  ALL_CITIES = data.cities;
}

// ─── LIST VIEW RENDERING ────────────────────────────────────────────────────────

function badgeForVisited(r) {
  return r.visited ? `<span class="badge badge-visited">✓ Visited${r.rating ? ' · ' + '★'.repeat(r.rating) : ''}</span>` : '';
}

// sqlDatetime is "YYYY-MM-DD HH:MM:SS" in the browser's own local wall-clock
// time (no timezone conversion — matches what the user typed in), e.g. from
// reservation_datetime. notesUpdatedAt (a separate call site) is real UTC
// and is formatted with formatUtcTimestamp instead.
function formatLocalDateTime(sqlDatetime, opts) {
  if (!sqlDatetime) return '';
  const d = new Date(sqlDatetime.replace(' ', 'T'));
  if (isNaN(d)) return sqlDatetime;
  return d.toLocaleString(undefined, opts || { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function formatUtcTimestamp(sqlUtcDatetime) {
  if (!sqlUtcDatetime) return '';
  const d = new Date(sqlUtcDatetime.replace(' ', 'T') + 'Z');
  if (isNaN(d)) return sqlUtcDatetime;
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// A standalone banner at the top of the card (not just a small badge buried
// among others) so an upcoming reservation is visible at a glance from the
// main list, with no need to click into the restaurant's detail page.
function reservationBanner(r) {
  if (!r.nextReservation) return '';
  const dateText = formatLocalDateTime(r.nextReservation, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  return `<div class="reservation-banner">📅 Reservation booked · ${escapeHtml(dateText)}</div>`;
}

function renderCard(r) {
  const badgesHtml = r.badges.map(b => `<span class="badge ${b.cls}">${escapeHtml(b.text)}</span>`).join('\n            ');
  const chaseHtml = r.chase ? `<span class="chase-logo">${escapeHtml(r.chase)}</span>` : '';
  const resNoteHtml = r.resNote ? `<div class="res-note">${escapeHtml(r.resNote)}</div>` : '';
  const linksHtml = r.links.map(l =>
    `<a class="link-btn ${l.cls}" href="${escapeHtml(l.href)}" target="_blank">${escapeHtml(l.text)}</a>`
  ).join('\n          ');
  const city = ALL_CITIES.find(c => c.city_key === r.city) || {};

  return `
<div class="card" data-city="${r.city}" data-tags="${r.tags.join(' ')}" data-id="${r.id}">
  ${reservationBanner(r)}
  <div class="card-header ${city.cls || ''}">
    <div>
      <div class="card-name"><a href="#/restaurant/${r.id}">${escapeHtml(r.name)}</a></div>
      <div class="card-type">${escapeHtml(r.type)}</div>
      <div class="badges">
        ${badgesHtml}
        ${badgeForVisited(r)}
      </div>
    </div>
    ${chaseHtml}
  </div>
  <div class="card-body">
    ${resNoteHtml}
    <div class="card-desc">${escapeHtml(r.desc)}</div>
    <div class="links">
      ${linksHtml}
      <a class="link-btn link-details" href="#/restaurant/${r.id}">📝 Notes &amp; Photos</a>
    </div>
  </div>
</div>`;
}

function renderCity(city) {
  const items = ALL_RESTAURANTS.filter(r => r.city === city.city_key);
  if (!items.length) return '';
  const dateSpan = city.dates ? `<span style="font-size:13px;color:#666;">${escapeHtml(city.dates)}</span>` : '';

  return `
<div class="city-section">
  <div class="city-header ${city.cls}">
    <h2>${city.emoji ? city.emoji + ' ' : ''}${escapeHtml(city.label)}</h2>
    ${dateSpan}
  </div>
  <div class="grid">
    ${items.map(renderCard).join('\n    ')}
  </div>
</div>`;
}

function renderState(stateName) {
  const cities = ALL_CITIES.filter(c => c.state === stateName).sort((a, b) => a.label.localeCompare(b.label));
  const count = ALL_RESTAURANTS.filter(r => cities.some(c => c.city_key === r.city)).length;
  if (count === 0) return '';
  const countSpan = ` <span class="state-count">(${count} spot${count === 1 ? '' : 's'})</span>`;
  const isOpen = ALL_STATES.length === 1; // auto-open when there's only one state with content

  return `
<details class="state-section"${isOpen ? ' open data-default-open' : ''}>
  <summary class="state-summary">${escapeHtml(stateName)}${countSpan}</summary>
  <div class="state-body">
    ${cities.map(renderCity).join('\n')}
  </div>
</details>`;
}

let ALL_STATES = [];

function renderCityFilterButtons() {
  const mount = document.getElementById('cityFilters');
  mount.innerHTML = ALL_CITIES
    .filter(c => ALL_RESTAURANTS.some(r => r.city === c.city_key))
    .sort((a, b) => a.label.localeCompare(b.label))
    .map(c => `<button class="filter-btn" onclick="filter('${c.city_key}', this)">${escapeHtml(c.label)}</button>`)
    .join('');
}

function renderList() {
  document.getElementById('detailMount').innerHTML = '';
  document.getElementById('detailMount').style.display = 'none';
  document.getElementById('listMount').style.display = '';

  const noRestaurantsState = document.getElementById('noRestaurantsState');
  if (ALL_RESTAURANTS.length === 0) {
    document.getElementById('statesMount').innerHTML = '';
    noRestaurantsState.style.display = '';
    renderCityFilterButtons();
    return;
  }
  noRestaurantsState.style.display = 'none';

  ALL_STATES = [...new Set(ALL_CITIES.map(c => c.state))].sort();
  document.getElementById('statesMount').innerHTML = ALL_STATES.map(renderState).join('\n');
  renderCityFilterButtons();
  applyFilters();
}

// ─── FILTER / SEARCH ────────────────────────────────────────────────────────────

function matchesTag(card, tag) {
  if (tag === 'all') return true;
  const city = card.dataset.city;
  const tags = (card.dataset.tags || '').split(' ');
  if (tag === 'vegan')    return tags.includes('vegan');
  if (tag === 'meat')     return tags.includes('meat');
  if (tag === 'chase')    return tags.includes('chase');
  if (tag === 'reserve')  return tags.includes('reserve');
  if (tag === 'dive')     return tags.includes('dive');
  if (tag === 'cocktail') return tags.includes('cocktail');
  return city === tag; // city filter buttons are keyed by city_key
}

function filter(tag, btn) {
  currentFilter = tag;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function clearFilters() {
  document.getElementById('searchInput').value = '';
  const allBtn = document.querySelector('.filter-btn');
  filter('all', allBtn);
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const isFiltering = query !== '' || currentFilter !== 'all';
  let firstVisible = null;
  let anyVisibleAtAll = false;

  document.querySelectorAll('.state-section').forEach(section => {
    let anyVisible = false;

    section.querySelectorAll('.card').forEach(card => {
      const matchesSearch = query === '' || card.textContent.toLowerCase().includes(query);
      const show = matchesSearch && matchesTag(card, currentFilter);
      card.classList.toggle('hidden', !show);
      if (show) {
        anyVisible = true;
        anyVisibleAtAll = true;
        if (!firstVisible) firstVisible = card;
      }
    });

    section.open = isFiltering ? anyVisible : section.hasAttribute('data-default-open');
  });

  const noResults = isFiltering && !anyVisibleAtAll;
  document.getElementById('noResultsState').style.display = noResults ? '' : 'none';
  document.getElementById('statesMount').style.display = noResults ? 'none' : '';

  if (isFiltering && firstVisible) {
    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ─── DETAIL VIEW (#/restaurant/:id) ─────────────────────────────────────────────

let currentDetailRestaurant = null;

async function renderDetail(id) {
  document.getElementById('listMount').style.display = 'none';
  const mount = document.getElementById('detailMount');
  mount.style.display = '';
  mount.setAttribute('aria-busy', 'true');
  mount.innerHTML = `<div class="detail-loading" role="status">Loading…</div>`;

  let r;
  try {
    r = await api(`/api/restaurants/${id}`);
  } catch (e) {
    mount.innerHTML = `<div class="detail-loading" role="alert">Could not load restaurant: ${escapeHtml(e.message)}</div><a href="#/" class="back-link">← Back</a>`;
    mount.removeAttribute('aria-busy');
    return;
  }
  mount.removeAttribute('aria-busy');
  currentDetailRestaurant = r;

  const photosHtml = r.photos.map(p =>
    `<img class="photo-thumb" src="${p.url}" alt="Photo of ${escapeHtml(r.name)}">`
  ).join('');

  mount.innerHTML = `
    <a href="#/" class="back-link">← Back to all restaurants</a>
    <div class="detail-card">
      <div class="detail-header">
        <div>
          <h2>${escapeHtml(r.name)}</h2>
          <div class="card-type">${escapeHtml(r.type)}</div>
        </div>
        ${r.chase ? `<span class="chase-logo">${escapeHtml(r.chase)}</span>` : ''}
      </div>
      <div class="badges">${r.badges.map(b => `<span class="badge ${b.cls}">${escapeHtml(b.text)}</span>`).join('')}</div>
      ${r.resNote ? `<div class="res-note">${escapeHtml(r.resNote)}</div>` : ''}
      <div class="card-desc">${escapeHtml(r.desc)}</div>
      <div class="links">${r.links.map(l => `<a class="link-btn ${l.cls}" href="${escapeHtml(l.href)}" target="_blank">${escapeHtml(l.text)}</a>`).join('')}</div>

      <div class="our-notes">
        <h3>Our Notes</h3>
        <label class="visited-check">
          <input type="checkbox" id="visitedCheck" ${r.visited ? 'checked' : ''}> We've been here
        </label>
        <div class="rating-block">
          <span id="ratingLabel">Rating:</span>
          <star-rating id="ratingInput" value="${r.rating || ''}" aria-labelledby="ratingLabel"></star-rating>
        </div>
        <label for="notesText" class="sr-only">Notes</label>
        <textarea id="notesText" placeholder="What did you think? Dishes to order again, service notes, etc.">${escapeHtml(r.notes || '')}</textarea>
        <button class="btn-save" id="saveNoteBtn" onclick="saveNote('${id}', this)">Save Notes</button>
        <status-message id="noteSaveStatus"></status-message>
        ${r.notesUpdatedAt ? `<div class="notes-timestamp">Last updated ${formatUtcTimestamp(r.notesUpdatedAt)}</div>` : ''}

        <h3>Reservations</h3>
        <div class="reservation-add">
          <label for="reservationDatetime" class="sr-only">Reservation date and time</label>
          <input type="datetime-local" id="reservationDatetime">
          <button class="btn-save" id="addReservationBtn" onclick="addReservation('${id}', this)">+ Add Reservation</button>
        </div>
        <status-message id="reservationStatus"></status-message>
        <div id="reservationsList">${renderReservationsList(r.reservations, id)}</div>

        <h3>Photos</h3>
        <div class="photo-grid" id="photoGrid">${photosHtml}</div>
        <label for="photoInput" class="sr-only">Add a photo</label>
        <input type="file" id="photoInput" accept="image/*" style="display:none" onchange="uploadPhoto('${id}', this)">
        <button class="btn-save" id="addPhotoBtn" onclick="document.getElementById('photoInput').click()">📷 Add Photo</button>
        <status-message id="photoUploadStatus"></status-message>
      </div>
    </div>
  `;

  // Autosave: rating and visited are single discrete choices, and notes is
  // saved on blur — so navigating away (e.g. "Back to all restaurants")
  // right after rating/checking/typing no longer silently discards it. The
  // explicit "Save Notes" button still works the same for a deliberate save.
  //
  // Debounced rather than firing saveNote() straight from each listener:
  // saveNote's PUT body is a full snapshot of all three fields read at
  // request-construction time, so two changes fired back-to-back (e.g.
  // checking "visited" then immediately picking a rating) start two
  // concurrent requests with different snapshots, and whichever one's
  // response lands last wins — silently clobbering the other field. A short
  // debounce coalesces rapid changes into one save that reads settled state.
  let autosaveTimer = null;
  function scheduleAutosave() {
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => saveNote(id, null), 250);
  }

  const visitedCheck = document.getElementById('visitedCheck');
  const ratingInput = document.getElementById('ratingInput');
  const notesText = document.getElementById('notesText');
  visitedCheck.addEventListener('change', scheduleAutosave);
  ratingInput.addEventListener('rating-change', scheduleAutosave);
  notesText.addEventListener('blur', () => {
    if (notesText.value !== (r.notes || '')) scheduleAutosave();
  });
}

// btn is null for autosave triggers (rating/visited change, notes blur) that
// aren't the explicit "Save Notes" button — in that case we skip the
// disable/label-swap dance withButtonLoading does and just fire the request.
async function saveNote(id, btn) {
  const status = document.getElementById('noteSaveStatus');
  status.show('Saving…');
  try {
    const doSave = () => api(`/api/restaurants/${id}/note`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        visited: document.getElementById('visitedCheck').checked,
        rating: document.getElementById('ratingInput').value,
        notes: document.getElementById('notesText').value,
      }),
    });
    await (btn ? withButtonLoading(btn, 'Saving…', doSave) : doSave());
    status.show('✓ Saved', 'success');
    const stamp = document.querySelector('.notes-timestamp');
    if (stamp) stamp.textContent = 'Last updated just now';
  } catch (e) {
    status.show('Error: ' + e.message, 'error');
  }
}

function renderReservationsList(reservations, id) {
  if (!reservations.length) {
    return `<p class="reservation-empty">No reservations logged yet.</p>`;
  }
  return reservations.map(res => `
    <div class="reservation-item" data-id="${res.id}">
      <span class="reservation-datetime">${escapeHtml(formatLocalDateTime(res.datetime))}</span>
      <button class="reservation-delete" onclick="deleteReservation('${id}', '${res.id}', this)" aria-label="Delete this reservation">✕</button>
    </div>
  `).join('');
}

async function addReservation(id, btn) {
  const input = document.getElementById('reservationDatetime');
  const status = document.getElementById('reservationStatus');

  if (!input.value) {
    status.show('Pick a date and time first.', 'error');
    return;
  }

  status.show('Saving…');
  try {
    await withButtonLoading(btn, 'Saving…', () => api(`/api/restaurants/${id}/reservations`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ datetime: input.value }),
    }));
    const r = await api(`/api/restaurants/${id}`);
    document.getElementById('reservationsList').innerHTML = renderReservationsList(r.reservations, id);
    input.value = '';
    status.show('✓ Reservation added', 'success');
  } catch (e) {
    status.show('Error: ' + e.message, 'error');
  }
}

async function deleteReservation(id, reservationId, btn) {
  const status = document.getElementById('reservationStatus');
  try {
    await withButtonLoading(btn, '…', () => api(`/api/restaurants/${id}/reservations/${reservationId}`, { method: 'DELETE' }));
    document.querySelector(`.reservation-item[data-id="${reservationId}"]`)?.remove();
    if (!document.querySelectorAll('.reservation-item').length) {
      document.getElementById('reservationsList').innerHTML = `<p class="reservation-empty">No reservations logged yet.</p>`;
    }
    status.show('✓ Removed', 'success');
  } catch (e) {
    status.show('Error: ' + e.message, 'error');
  }
}

async function uploadPhoto(id, input) {
  const file = input.files[0];
  if (!file) return;
  const status = document.getElementById('photoUploadStatus');
  const btn = document.getElementById('addPhotoBtn');
  status.show('Uploading…');

  const form = new FormData();
  form.append('photo', file);

  try {
    const photo = await withButtonLoading(btn, 'Uploading…', () =>
      api(`/api/restaurants/${id}/photos`, { method: 'POST', body: form })
    );
    const name = currentDetailRestaurant?.name || '';
    document.getElementById('photoGrid').insertAdjacentHTML(
      'beforeend', `<img class="photo-thumb" src="${photo.url}" alt="Photo of ${escapeHtml(name)}">`
    );
    status.show('✓ Uploaded', 'success');
  } catch (e) {
    status.show('Error: ' + e.message, 'error');
  }
  input.value = '';
}

// ─── ADD RESTAURANT ─────────────────────────────────────────────────────────────

function openAddModal() {
  document.getElementById('addModal').open = true;
}
function closeAddModal() {
  document.getElementById('addModal').open = false;
}

// Whichever way the modal closes (Escape, backdrop click, ✕ button, or a
// successful save), reset the form and clear any leftover status message.
document.getElementById('addModal').addEventListener('modal-close', () => {
  document.getElementById('addForm').reset();
  document.getElementById('addStatus').clear();
});

async function submitAddRestaurant(ev) {
  ev.preventDefault();
  const f = ev.target;
  const submitBtn = f.querySelector('button[type="submit"]');
  const tags = [...f.querySelectorAll('input[name="tags"]:checked')].map(cb => cb.value);
  const status = document.getElementById('addStatus');

  if (!f.name.value.trim() || !f.city.value.trim() || !f.state.value.trim()) {
    status.show('Name, city, and state are required.', 'error');
    return;
  }

  status.show('Saving…');
  try {
    await withButtonLoading(submitBtn, 'Saving…', () => api('/api/restaurants', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: f.name.value,
        cityLabel: f.city.value,
        state: f.state.value,
        type: f.type.value,
        desc: f.desc.value,
        tags,
      }),
    }));
    await loadData();
    closeAddModal();
    route();
  } catch (e) {
    status.show('Error: ' + e.message, 'error');
  }
}

// ─── ROUTING ─────────────────────────────────────────────────────────────────────

function route() {
  const hash = window.location.hash;
  const m = hash.match(/^#\/restaurant\/(.+)$/);
  if (m) {
    renderDetail(decodeURIComponent(m[1]));
  } else {
    renderList();
  }
}

window.addEventListener('hashchange', route);

// ─── MOBILE FILTERS/LEGEND TOGGLE ────────────────────────────────────────────────
// No-op above the 700px breakpoint (the button is hidden there by CSS and the
// body is always visible), so this is safe to wire up unconditionally.

const mobileTogglesToggle = document.getElementById('mobileTogglesToggle');
mobileTogglesToggle.addEventListener('click', () => {
  const wrapper = document.getElementById('mobileToggles');
  const open = wrapper.classList.toggle('open');
  mobileTogglesToggle.setAttribute('aria-expanded', String(open));
});

// ─── BACK TO TOP ────────────────────────────────────────────────────────────────

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── INIT ───────────────────────────────────────────────────────────────────────

async function init() {
  document.getElementById('statesMount').innerHTML = renderSkeletonCards(6);
  document.getElementById('statesMount').setAttribute('aria-busy', 'true');

  try {
    await loadData();
  } catch (e) {
    document.getElementById('statesMount').innerHTML = `<div class="detail-loading" role="alert">Could not load restaurants: ${escapeHtml(e.message)}</div>`;
    return;
  } finally {
    document.getElementById('statesMount').removeAttribute('aria-busy');
  }
  route();
}

init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});
