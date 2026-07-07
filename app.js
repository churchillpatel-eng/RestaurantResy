// ─── RENDERING ────────────────────────────────────────────────────────────────
// Builds the page DOM from STATE_ORDER / CITY_META / RESTAURANTS (data.js).
// Adding a restaurant = add one object to RESTAURANTS. No HTML surgery required.

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderCard(r) {
  const badgesHtml = r.badges.map(b => `<span class="badge ${b.cls}">${escapeHtml(b.text)}</span>`).join('\n            ');
  const chaseHtml = r.chase ? `<span class="chase-logo">${escapeHtml(r.chase)}</span>` : '';
  const resNoteHtml = r.resNote ? `<div class="res-note">${escapeHtml(r.resNote)}</div>` : '';
  const linksHtml = r.links.map(l =>
    `<a class="link-btn ${l.cls}" href="${escapeHtml(l.href)}" target="_blank">${escapeHtml(l.text)}</a>`
  ).join('\n          ');
  const cityMeta = Object.values(CITY_META).find(c => c.label.toLowerCase().replace(/\s+/g, '-') === r.city) || {};

  return `
<div class="card" data-city="${r.city}" data-tags="${r.tags.join(' ')}">
  <div class="card-header ${cityMeta.cls || ''}">
    <div>
      <div class="card-name">${escapeHtml(r.name)}</div>
      <div class="card-type">${escapeHtml(r.type)}</div>
      <div class="badges">
        ${badgesHtml}
      </div>
    </div>
    ${chaseHtml}
  </div>
  <div class="card-body">
    ${resNoteHtml}
    <div class="card-desc">${escapeHtml(r.desc)}</div>
    <div class="links">
      ${linksHtml}
    </div>
  </div>
</div>`;
}

function renderCity(cityLabel) {
  const meta = CITY_META[cityLabel];
  const cityKey = cityLabel.toLowerCase().replace(/\s+/g, '-');
  const items = RESTAURANTS.filter(r => r.city === cityKey);
  const dateSpan = meta.dates ? `<span style="font-size:13px;color:#666;">${escapeHtml(meta.dates)}</span>` : '';

  return `
<div class="city-section">
  <div class="city-header ${meta.cls}">
    <h2>${meta.emoji ? meta.emoji + ' ' : ''}${escapeHtml(meta.label)}</h2>
    ${dateSpan}
  </div>
  <div class="grid">
    ${items.map(renderCard).join('\n    ')}
  </div>
</div>`;
}

function renderState(stateName) {
  const cities = CITY_ORDER.filter(c => CITY_META[c].state === stateName);
  const count = RESTAURANTS.filter(r => cities.some(c => c.toLowerCase().replace(/\s+/g, '-') === r.city)).length;
  const isDefaultOpen = DEFAULT_OPEN_STATES.includes(stateName);
  const countSpan = count > 0 ? ` <span class="state-count">(${count} spot${count === 1 ? '' : 's'})</span>` : '';

  const body = cities.length
    ? cities.map(renderCity).join('\n')
    : `<p class="state-empty">No dining recs added yet.</p>`;

  return `
<details class="state-section"${isDefaultOpen ? ' open data-default-open' : ''}>
  <summary class="state-summary">${escapeHtml(stateName)}${countSpan}</summary>
  <div class="state-body">
    ${body}
  </div>
</details>`;
}

function renderPage() {
  document.getElementById('statesMount').innerHTML = STATE_ORDER.map(renderState).join('\n');
}

// ─── FILTER / SEARCH ────────────────────────────────────────────────────────────

let currentFilter = 'all';

function matchesTag(card, tag) {
  if (tag === 'all') return true;
  const city = card.dataset.city;
  const tags = (card.dataset.tags || '').split(' ');
  if (tag === 'santa-fe')    return city === 'santa-fe';
  if (tag === 'taos')        return city === 'taos';
  if (tag === 'albuquerque') return city === 'albuquerque';
  if (tag === 'vegan')       return tags.includes('vegan');
  if (tag === 'meat')        return tags.includes('meat');
  if (tag === 'chase')       return tags.includes('chase');
  if (tag === 'reserve')     return tags.includes('reserve');
  return true;
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

// ─── BACK TO TOP ────────────────────────────────────────────────────────────────

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── INIT ───────────────────────────────────────────────────────────────────────

renderPage();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
});
