// Central state → all reactive data lives in one object.
const state = {
  name: "World"
};

// Bindings map: keeps track of which DOM elements depend on each state key
// Key = state property, Value = array of elements (text spans or inputs)
const bindings = {};

// Text bindings (data-bind) → automatically update text nodes when state changes.
document.querySelectorAll("[data-bind]").forEach(el => {
  const key = el.getAttribute("data-bind");
  if (!bindings[key]) bindings[key] = [];
  bindings[key].push(el);
  el.textContent = state[key]; // initial render
});

// Initialize input bindings (v-model) → automatically update state when typing, and update UI if state changes programmatically.
document.querySelectorAll("[data-model]").forEach(input => {
  const key = input.getAttribute("data-model");
  if (!bindings[key]) bindings[key] = [];
  bindings[key].push(input);
  input.value = state[key] ?? "";

  // update state on input
  input.addEventListener("input", e => {
    setState(key, e.target.value);
  });
});

// setState updates state and all bound elements
function setState(key, value) {
  state[key] = value;
  if (bindings[key]) {
    bindings[key].forEach(el => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
        if (document.activeElement !== el) el.value = value; // avoid clobbering while typing
      } else {
        el.textContent = value;
      }
    });
  }
}