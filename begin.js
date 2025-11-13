// Step 1: central state object (later: reactive system)
const state = {
  name: "World"
};

// manual DOM refs → later: auto-binding saves boilerplate
const input = document.getElementById("input");
const output = document.getElementById("output");

// manual init → later: auto-render keeps UI synced by default
input.value = state.name;
output.textContent = state.name;

// manual reactivity → later: state changes auto-update UI
input.addEventListener("input", (e) => {
  state.name = e.target.value;
  output.textContent = state.name;
});

// no dependency tracking → later: map data → elements, so changes only re-render what's affected


