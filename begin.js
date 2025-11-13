 const state = {
  name: "World"
};

// Bindings map: key → array of bound elements
const bindings = {};

// --- Initialize all bindings ---
function initBindings() {
  // Text bindings: render state automatically
  document.querySelectorAll("[data-bind]").forEach(el => {
    const key = el.getAttribute("data-bind");
    if (!bindings[key]) bindings[key] = [];
    bindings[key].push(el);

    // Auto-render initial value
    el.textContent = state[key] ?? "";
  });

  // Input bindings (v-model): update state on input
  document.querySelectorAll("[data-model]").forEach(input => {
    const key = input.getAttribute("data-model");
    if (!bindings[key]) bindings[key] = [];
    bindings[key].push(input);

    // Auto-set initial input value
    input.value = state[key] ?? "";

    // Auto-update state when typing
    input.addEventListener("input", e => {
      setState(key, e.target.value);
    });
  });
}

// --- setState function ---
// Updates state and all bound elements automatically
function setState(key, value) {
  state[key] = value;

  if (bindings[key]) {
    bindings[key].forEach(el => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        if (document.activeElement !== el) el.value = value; // avoid overwriting while typing
      } else {
        el.textContent = value;
      }
    });
  }
}

// Initialize all bindings: fully reactive and auto-rendered
initBindings();

// At this point:
// 1. All text spans reflect state automatically
// 2. All inputs are bound to state via v-model
// 3. Initial values are rendered automatically