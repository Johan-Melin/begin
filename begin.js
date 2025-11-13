// plain variable → later: reactive state for multiple values
let name = "World";

// manual DOM refs → later: auto-binding saves boilerplate
const input = document.getElementById("input");
const output = document.getElementById("output");

// manual init → later: auto-render keeps UI synced by default
input.value = name;
output.textContent = name;

// manual reactivity → later: state changes auto-update UI
input.addEventListener("input", (e) => {
  name = e.target.value;
  output.textContent = name;
});

// no dependency tracking → later: map data → elements, so changes only re-render what's affected


