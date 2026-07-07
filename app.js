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
  if (tag === 'vegan')   return tags.includes('vegan');
  if (tag === 'meat')    return tags.includes('meat');
  if (tag === 'chase')   return tags.includes('chase');
  if (tag === 'reserve') return tags.includes('reserve');
  return city === tag; // city filter buttons are keyed by city_key
}

function filter(tag, btn) {
  currentFilter = tag;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const isFiltering = query !== '' || currentFilter !== 'all';
  let firstVisible = null;

  document.querySelectorAll('.state-section').forEach(section => {
    let anyVisible = false;

    section.querySelectorAll('.card').forEach(card => {
      const matchesSearch = query === '' || card.textContent.toLowerCase().includes(query);
      const show = matchesSearch && matchesTag(card, currentFilter);
      card.classList.toggle('hidden', !show);
      if (show) {
        anyVisible = true;
        if (!firstVisible) firstVisible = card;
      }
    });

    section.open = isFiltering ? anyVisible : section.hasAttribute('data-default-open');
  });

  if (isFiltering && firstVisible) {
    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ─── DETAIL VIEW (#/restaurant/:id) ─────────────────────────────────────────────

function starRow(current, editable) {
  let html = '<div class="star-row">';
  for (let i = 1; i <= 5; i++) {
    const filled = current && i <= current;
    html += editable
      ? `<span class="star ${filled ? 'filled' : ''}" data-value="${i}" onclick="setRating(${i})">★</span>`
      : `<span class="star ${filled ? 'filled' : ''}">★</span>`;
  }
  return html + '</div>';
}

let detailDraftRating = null;

async function renderDetail(id) {
  document.getElementById('listMount').style.display = 'none';
  const mount = document.getElementById('detailMount');
  mount.style.display = '';
  mount.innerHTML = `<div class="detail-loading">Loading…</div>`;

  let r;
  try {
    r = await api(`/api/restaurants/${id}`);
  } catch (e) {
    mount.innerHTML = `<div class="detail-loading">Could not load restaurant: ${escapeHtml(e.message)}</div><a href="#/">← Back</a>`;
    return;
  }

  detailDraftRating = r.rating;

  const photosHtml = r.photos.map(p => `<img class="photo-thumb" src="${p.url}" alt="">`).join('');

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
          <span>Rating:</span>
          ${starRow(r.rating, true)}
        </div>
        <textarea id="notesText" placeholder="What did you think? Dishes to order again, service notes, etc.">${escapeHtml(r.notes || '')}</textarea>
        <button class="btn-save" onclick="saveNote('${id}')">Save Notes</button>
        <span id="noteSaveStatus"></span>

        <h3>Photos</h3>
        <div class="photo-grid" id="photoGrid">${photosHtml}</div>
        <input type="file" id="photoInput" accept="image/*" style="display:none" onchange="uploadPhoto('${id}')">
        <button class="btn-save" onclick="document.getElementById('photoInput').click()">📷 Add Photo</button>
        <span id="photoUploadStatus"></span>
      </div>
    </div>
  `;
}

function setRating(value) {
  detailDraftRating = detailDraftRating === value ? null : value;
  document.querySelectorAll('.rating-block .star').forEach((el, i) => {
    el.classList.toggle('filled', detailDraftRating && i < detailDraftRating);
  });
}

async function saveNote(id) {
  const status = document.getElementById('noteSaveStatus');
  status.textContent = 'Saving…';
  try {
    await api(`/api/restaurants/${id}/note`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        visited: document.getElementById('visitedCheck').checked,
        rating: detailDraftRating,
        notes: document.getElementById('notesText').value,
      }),
    });
    status.textContent = '✓ Saved';
    setTimeout(() => { status.textContent = ''; }, 2000);
  } catch (e) {
    status.textContent = 'Error: ' + e.message;
  }
}

async function uploadPhoto(id) {
  const input = document.getElementById('photoInput');
  const file = input.files[0];
  if (!file) return;
  const status = document.getElementById('photoUploadStatus');
  status.textContent = 'Uploading…';

  const form = new FormData();
  form.append('photo', file);

  try {
    const photo = await api(`/api/restaurants/${id}/photos`, { method: 'POST', body: form });
    document.getElementById('photoGrid').insertAdjacentHTML('beforeend', `<img class="photo-thumb" src="${photo.url}" alt="">`);
    status.textContent = '✓ Uploaded';
    setTimeout(() => { status.textContent = ''; }, 2000);
  } catch (e) {
    status.textContent = 'Error: ' + e.message;
  }
  input.value = '';
}

// ─── ADD RESTAURANT ─────────────────────────────────────────────────────────────

function openAddModal() {
  document.getElementById('addModal').style.display = 'flex';
}
function closeAddModal() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('addForm').reset();
  document.getElementById('addStatus').textContent = '';
}

async function submitAddRestaurant(ev) {
  ev.preventDefault();
  const f = ev.target;
  const tags = [...f.querySelectorAll('input[name="tags"]:checked')].map(cb => cb.value);
  const status = document.getElementById('addStatus');
  status.textContent = 'Saving…';

  try {
    await api('/api/restaurants', {
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
    });
    await loadData();
    closeAddModal();
    route();
  } catch (e) {
    status.textContent = 'Error: ' + e.message;
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

// ─── BACK TO TOP ────────────────────────────────────────────────────────────────

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── INIT ───────────────────────────────────────────────────────────────────────

async function init() {
  try {
    await loadData();
  } catch (e) {
    document.getElementById('listMount').innerHTML = `<div class="detail-loading">Could not load restaurants: ${escapeHtml(e.message)}</div>`;
    return;
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
