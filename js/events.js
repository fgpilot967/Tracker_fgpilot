
console.log("events.js geladen");

// events.js

import { saveAllPilotTables } from './storage.js';

export function attachSaveTriggers() {
  const container = document.getElementById('pilotTablesContainer');

  if (!container) return;

  // Alle Eingabefelder, Inhalte & Checkboxen überwachen
  const inputs = container.querySelectorAll('input, td[contenteditable]');

  inputs.forEach(el => {
    if (el.tagName === 'INPUT') {
      el.addEventListener('change', saveAllPilotTables);
    } else {
      // Für contenteditable: keyup, blur
      el.addEventListener('input', saveAllPilotTables);
      el.addEventListener('blur', saveAllPilotTables);
    }
  });
}



