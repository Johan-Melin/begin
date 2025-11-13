const state = {
  name: "World"
};

// Bindings map: key → array of bound elements
const bindings = {};

// --- Initialize all bindings ---
function initBindings() {
  // Text bindings: automatically render state in elements with data-bind
  document.querySelectorAll("[data-bind]").forEach(el => {
    const key = el.getAttribute("data-bind");
    if (!bindings[key]) bindings[key] = [];
    bindings[key].push(el);
    el.textContent = state[key] ?? ""; // initial render
  });

  // Input bindings (v-model): automatically update state when typing
  document.querySelectorAll("[data-model]").forEach(input => {
    const key = input.getAttribute("data-model");
    if (!bindings[key]) bindings[key] = [];
    bindings[key].push(input);
    input.value = state[key] ?? ""; // initial value

    // update state automatically when user types
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
        // Avoid overwriting input while user is typing
        if (document.activeElement !== el) el.value = value;
      } else {
        el.textContent = value;
      }
    });
  }
}

// Initialize bindings (text and input) on page load
initBindings();

// Now input and text span are fully reactive with minimal code