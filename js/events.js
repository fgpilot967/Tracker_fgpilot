
console.log("events.js geladen");

// events.js

import { saveAllPilotTables, saveAllPilotDetailsTables } from './storage.js';

export function attachSaveTriggers() {
  const container = document.getElementById('pilotTablesContainer');
  const detailsContainer = document.getElementById('pilotDetailsContainer');

  if (!container) return;
  if (!detailsContainer) return;

  // Alle Eingabefelder, Inhalte & Checkboxen überwachen
  const inputs = container.querySelectorAll('input, td[contenteditable]');
  const detailsInputs = detailsContainer.querySelectorAll('input, td[contenteditable]');

  inputs.forEach(el => {
    if (el.tagName === 'INPUT') {
      el.addEventListener('change', saveAllPilotTables);
    } else {
      // Für contenteditable: keyup, blur
      el.addEventListener('input', saveAllPilotTables);
      el.addEventListener('blur', saveAllPilotTables);
    }
  });

  detailsInputs.forEach(el => {
    if (el.tagName === 'INPUT') {
      el.addEventListener('change', saveAllPilotDetailsTables);
    } else {
      // Für contenteditable: keyup, blur
      el.addEventListener('input', saveAllPilotDetailsTables);
      el.addEventListener('blur', saveAllPilotDetailsTables);
    }
  });

}



