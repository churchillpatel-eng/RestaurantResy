// ─── Reusable UI components (vanilla Custom Elements, light DOM) ───────────────
// No shadow DOM: components inherit styling from style.css like any other
// element, so there's exactly one place (style.css) that owns visual design.
// Each element supports: keyboard interaction, ARIA semantics, a disabled/
// loading state, and ships usage examples in the doc comment above its class.

// ── <star-rating> ───────────────────────────────────────────────────────────
//
// Props (attributes):
//   value      number 0-5 (0 or absent = unrated)
//   readonly   presence-only; renders a static display, not interactive
//   disabled   presence-only; interactive but temporarily can't change
//              (e.g. while a save request is in flight)
//   size       "sm" | "md" (default) | "lg"
//
// Events:
//   "rating-change"  detail: { value: number|null }  fired only when the
//                    user changes the rating (not on programmatic .value=)
//
// Usage:
//   <star-rating value="4"></star-rating>                      editable
//   <star-rating value="4" readonly></star-rating>              display-only
//   <star-rating id="r" size="lg"></star-rating>
//   document.getElementById('r').addEventListener('rating-change', e => ...)
//
// Accessibility: role="radiogroup" of role="radio" stars, roving tabindex,
// Arrow Left/Right/Home/End to move, Space/Enter to pick (pick again to clear).
class StarRatingElement extends HTMLElement {
  static get observedAttributes() { return ['value', 'readonly', 'disabled', 'size']; }

  connectedCallback() {
    this.setAttribute('role', this.hasAttribute('readonly') ? 'img' : 'radiogroup');
    this.render();
  }

  attributeChangedCallback() { this.render(); }

  get value() {
    const v = Number(this.getAttribute('value'));
    return v >= 1 && v <= 5 ? v : null;
  }
  set value(v) {
    if (v === null || v === undefined) this.removeAttribute('value');
    else this.setAttribute('value', String(v));
  }

  render() {
    const value = this.value;
    const readonly = this.hasAttribute('readonly');
    const disabled = this.hasAttribute('disabled');
    const size = this.getAttribute('size') || 'md';
    this.classList.toggle('star-rating-readonly', readonly);
    this.classList.add('star-rating', `star-rating-${size}`);

    if (readonly) {
      this.setAttribute('aria-label', value ? `Rated ${value} out of 5 stars` : 'Not yet rated');
      this.innerHTML = [1, 2, 3, 4, 5]
        .map(i => `<span class="star ${value && i <= value ? 'filled' : ''}" aria-hidden="true">★</span>`)
        .join('');
      return;
    }

    this.setAttribute('aria-label', 'Rating');
    this.innerHTML = [1, 2, 3, 4, 5].map(i => {
      const filled = value && i <= value;
      const isFocusStop = i === (value || 1);
      return `<span
        class="star ${filled ? 'filled' : ''}"
        role="radio"
        aria-checked="${value === i}"
        aria-label="${i} star${i > 1 ? 's' : ''}"
        tabindex="${disabled ? -1 : (isFocusStop ? 0 : -1)}"
        data-value="${i}"
      >★</span>`;
    }).join('');

    if (!disabled) {
      this.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => this._pick(Number(star.dataset.value)));
        star.addEventListener('keydown', e => this._onKeydown(e));
      });
    }
  }

  _pick(newValue) {
    if (this.hasAttribute('disabled')) return;
    const next = this.value === newValue ? null : newValue; // click again to clear
    this.value = next;
    this.dispatchEvent(new CustomEvent('rating-change', { detail: { value: next }, bubbles: true }));
  }

  _onKeydown(e) {
    const current = this.value || 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(5, current + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(1, current - 1);
    else if (e.key === 'Home') next = 1;
    else if (e.key === 'End') next = 5;
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._pick(current); return; }
    else return;

    e.preventDefault();
    this.value = next;
    this.dispatchEvent(new CustomEvent('rating-change', { detail: { value: next }, bubbles: true }));
    this.querySelector(`.star[data-value="${next}"]`)?.focus();
  }
}
customElements.define('star-rating', StarRatingElement);

// ── <app-modal> ──────────────────────────────────────────────────────────────
//
// Props (attributes):
//   open    presence-only; controls visibility
//   label   accessible name for the dialog (aria-label)
//
// Slots: default slot = modal body content (put your own header/close button
//        inside; app-modal only supplies the overlay, focus trap, and a11y wiring).
//
// Events:
//   "modal-close"   fired when the user closes it (Escape or backdrop click)
//
// Usage:
//   <app-modal id="addModal" label="Add Restaurant">
//     <div class="modal">...your markup, including its own close button...</div>
//   </app-modal>
//   addModal.addEventListener('modal-close', () => form.reset());
//   addModal.open = true;  // or addModal.setAttribute('open', '')
//
// Accessibility: role="dialog" aria-modal="true", traps Tab focus inside,
// Escape closes, focus moves to the first focusable child on open and
// returns to whatever triggered the open on close.
class AppModalElement extends HTMLElement {
  static get observedAttributes() { return ['open']; }

  connectedCallback() {
    this.setAttribute('role', 'presentation');
    this._onKeydown = this._onKeydown.bind(this);
    this.addEventListener('click', e => { if (e.target === this) this.close(); });
    this._render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'open') {
      if (newVal !== null) this._onOpen(); else this._onClose();
    }
  }

  get open() { return this.hasAttribute('open'); }
  set open(v) { v ? this.setAttribute('open', '') : this.removeAttribute('open'); }

  close() { this.removeAttribute('open'); this.dispatchEvent(new CustomEvent('modal-close', { bubbles: true })); }

  _render() {
    this.classList.add('modal-overlay');
    let panel = this.querySelector('[role="dialog"]');
    if (!panel) {
      // Wrap the light-DOM children in a dialog panel once.
      panel = document.createElement('div');
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      if (this.getAttribute('label')) panel.setAttribute('aria-label', this.getAttribute('label'));
      while (this.firstChild) panel.appendChild(this.firstChild);
      this.appendChild(panel);
    }
    this._panel = panel;
  }

  _onOpen() {
    this._triggerEl = document.activeElement;
    this.style.display = 'flex';
    document.addEventListener('keydown', this._onKeydown);
    const preferred = this._panel.querySelector('[autofocus]');
    const focusable = this._focusable();
    (preferred || focusable[0] || this._panel).focus();
  }

  _onClose() {
    this.style.display = 'none';
    document.removeEventListener('keydown', this._onKeydown);
    this._triggerEl?.focus?.();
  }

  _focusable() {
    return [...this._panel.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')];
  }

  _onKeydown(e) {
    if (e.key === 'Escape') { this.close(); return; }
    if (e.key !== 'Tab') return;
    const items = this._focusable();
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}
customElements.define('app-modal', AppModalElement);

// ── <status-message> ─────────────────────────────────────────────────────────
//
// Props (attributes):
//   type       "info" (default) | "success" | "error"
//   duration   ms before auto-clearing; 0 = stays until replaced (default:
//              2000 for success/info, 0 for error)
//
// Method: statusEl.show(text, type?)   statusEl.clear()
//
// Usage:
//   <status-message id="noteStatus"></status-message>
//   document.getElementById('noteStatus').show('Saving…');
//   ...
//   document.getElementById('noteStatus').show('Saved', 'success');
//   document.getElementById('noteStatus').show('Could not save: ' + e.message, 'error');
//
// Accessibility: success/info use aria-live="polite" (role="status"); errors
// use aria-live="assertive" (role="alert") so screen readers interrupt for them.
class StatusMessageElement extends HTMLElement {
  connectedCallback() {
    this.classList.add('status-message');
    this._applyRole('info');
  }

  _applyRole(type) {
    this.setAttribute('role', type === 'error' ? 'alert' : 'status');
    this.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  }

  show(text, type = 'info') {
    clearTimeout(this._timer);
    this._applyRole(type);
    this.textContent = text;
    this.className = `status-message status-message-${type}`;
    const duration = this.hasAttribute('duration') ? Number(this.getAttribute('duration')) : (type === 'error' ? 0 : 2200);
    if (duration > 0) this._timer = setTimeout(() => this.clear(), duration);
  }

  clear() {
    clearTimeout(this._timer);
    this.textContent = '';
    this.className = 'status-message';
  }
}
customElements.define('status-message', StatusMessageElement);

// ── <empty-state> ────────────────────────────────────────────────────────────
//
// Props (attributes): icon, heading, message
// Slot: optional action (e.g. a button to clear filters)
//
// Usage:
//   <empty-state icon="🔍" heading="No restaurants match"
//                message="Try a different search or clear filters.">
//     <button onclick="clearFilters()">Clear filters</button>
//   </empty-state>
//
// Accessibility: role="status" so screen reader users are told when a
// list they were browsing has become empty as a result of their action.
class EmptyStateElement extends HTMLElement {
  static get observedAttributes() { return ['icon', 'heading', 'message']; }

  connectedCallback() {
    this.setAttribute('role', 'status');
    this.classList.add('empty-state');
    this._captureActionSlot();
    this.render();
  }

  attributeChangedCallback() {
    // Attribute reactions can fire before connectedCallback during parser
    // upgrade, so capture the original light-DOM children (the action
    // button) here too — guarded so it only ever happens once, whichever
    // callback runs first, before render() has a chance to overwrite them.
    this._captureActionSlot();
    this.render();
  }

  _captureActionSlot() {
    if (this._actionSlot) return;
    this._actionSlot = [...this.childNodes];
  }

  render() {
    if (!this._actionSlot) return;
    const icon = this.getAttribute('icon') || '🍽️';
    const heading = this.getAttribute('heading') || 'Nothing here yet';
    const message = this.getAttribute('message') || '';
    this.innerHTML = `
      <div class="empty-state-icon" aria-hidden="true">${icon}</div>
      <div class="empty-state-heading">${heading}</div>
      ${message ? `<div class="empty-state-message">${message}</div>` : ''}
      <div class="empty-state-action"></div>
    `;
    const actionMount = this.querySelector('.empty-state-action');
    this._actionSlot.forEach(node => actionMount.appendChild(node));
  }
}
customElements.define('empty-state', EmptyStateElement);

// ── Loading-button helper ────────────────────────────────────────────────────
//
// Not a custom element — it's a one-line wrapper around a plain <button> that
// already exists in your markup, so it works with any button without forcing
// a new tag everywhere a button is used.
//
// Usage:
//   <button id="saveBtn" onclick="save()">Save</button>
//   async function save() {
//     await withButtonLoading(document.getElementById('saveBtn'), 'Saving…', async () => {
//       await api(...);
//     });
//   }
//
// Behavior: disables the button (prevents double-submit) and swaps its label
// to loadingText for the duration of the async function, restoring the
// original label and enabled state afterward (even if it throws).
async function withButtonLoading(button, loadingText, fn) {
  const original = button.textContent;
  const wasDisabled = button.disabled;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = loadingText;
  try {
    return await fn();
  } finally {
    button.disabled = wasDisabled;
    button.removeAttribute('aria-busy');
    button.textContent = original;
  }
}

// ── Skeleton loading cards ───────────────────────────────────────────────────
//
// Usage: mount.innerHTML = renderSkeletonCards(6);  // while the real fetch is in flight
function renderSkeletonCards(count = 6) {
  const card = `
    <div class="card skeleton-card" aria-hidden="true">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-sub"></div>
      <div class="skeleton-line skeleton-body"></div>
      <div class="skeleton-line skeleton-body" style="width:70%"></div>
    </div>`;
  return `<div class="grid">${card.repeat(count)}</div>`;
}
