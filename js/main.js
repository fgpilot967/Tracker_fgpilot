// main.js
console.log("main.js geladen");

//------------------🔧 Globale Konstanten ------------------//
const numberOfPilots = 10;
const numberOfRowsPilots = 15;
const numberOfRowsDetail = 15;
const numberOfRowsTask = 15;
const numberOfFixItems = 8;
const numberOfFixTask = 8;


//------------------📦 Imports ------------------//
import {
  createPilotTable,
  createPilotDetailTable,
  createPilotCompanyTable
} from './pilotTables.js';

import { loadAllPilotDetailsTables, loadAllPilotTables, saveAllPilotTables } from './storage.js';
import { openTab, updatePilotDropdownFromTable } from './ui.js';
import {
  calculateRow,
  updatePilotTable,
  updateAllPilots
} from './calculation.js';
import { attachSaveTriggers } from './events.js';
import {
  pilotNames, updateArrayPilotNames,
  pilotRank, updateArrayPilotRank,
  notifyEmailPilots, updateArrayNotifyEmail,
  fixedDetailItems, updateDetailArrayFromIds,
  insertFixedDetailItems, updatePilotHeadlines,
  fixedTaskItems, updateArrayFixTask,
  insertFixedTaskItems, updatePilotParagraph, updatePilotParagraphRank
} from './arrays.js';


//------------------🧱 DOM Aufbau ------------------//
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content geladen");

  // Tabellen erzeugen
  const container = document.getElementById('pilotTablesContainer');
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(createPilotTable(pilot, numberOfRowsPilots));
    container.appendChild(wrapper);
  }

  const detailContainer = document.getElementById('pilotDetailsContainer');
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    const wrapper = document.createElement('div');
    wrapper.id = `pilotWrapper${pilot}`;
    wrapper.className = "tabcontent";
    wrapper.style.display = "none";

    const subWrapper = document.createElement('div');
    subWrapper.style.display = "flex";
    subWrapper.style.alignItems = "flex-start";
    subWrapper.style.gap = "300px";
    subWrapper.appendChild(createPilotDetailTable(pilot, numberOfRowsDetail, numberOfFixItems));
    subWrapper.appendChild(createPilotCompanyTable(pilot, numberOfRowsTask, numberOfFixItems));
    wrapper.appendChild(subWrapper);

    detailContainer.appendChild(wrapper); 
  }
});


//------------------🔁 Live-Berechnungen aktivieren ------------------//
setTimeout(() => {
  for (let p = 1; p <= numberOfPilots; p++) {
  setupLiveCalculation(p, numberOfRowsPilots);
}}, 100);


function setupLiveCalculation(pilotNumber, numberOfRowsPilots) {
  for (let row = 1; row <= numberOfRowsPilots; row++) {
    const input = document.getElementById(`lastCheckLiLane${row}Pilot${pilotNumber}`);
    if (input) {
      input.addEventListener("change", () => calculateRow(pilotNumber, row));
    }

    const validityCell = document.getElementById(`validityLiLane${row}Pilot${pilotNumber}`);
    if (validityCell) {
      validityCell.addEventListener("blur", () => calculateRow(pilotNumber, row));
    }
  }
}


//------------------💾 Manuelle Speicherfunktionen ------------------//
function saveTablePilotList() {
  const table = document.getElementById("editableTablePilotList");
  const rows = table.rows;
  const tableData = [];

  for (let i = 1; i < rows.length; i++) {
    const rowData = [];
    for (let j = 0; j < rows[i].cells.length; j++) {
      rowData.push(rows[i].cells[j].textContent.trim());
    }
    tableData.push(rowData);
  }

  localStorage.setItem("TablePilotList", JSON.stringify(tableData));
  console.log("Pilot-List gespeichert");
}

function loadTablePilotList() {
  const table = document.getElementById("editableTablePilotList");
  const storedData = JSON.parse(localStorage.getItem("TablePilotList"));

  if (storedData) {
    for (let i = 1; i < table.rows.length; i++) {
      const row = table.rows[i];
      const rowData = storedData[i - 1];
      if (rowData) {
        for (let j = 0; j < row.cells.length; j++) {
          row.cells[j].textContent = rowData[j] || "";
        }
      }
    }
    console.log("✅ Pilot-List geladen");
  } else {
    console.log("Keine gespeicherten Daten für Pilot-List gefunden.");
  }

  updateArrayPilotRank();
  updateArrayNotifyEmail();
  updateArrayPilotNames();
  updatePilotHeadlines();
}


//------------------🧠 Initialisierungs-Sicherung ------------------//
setTimeout(() => {
  loadAllPilotTables();
  loadAllPilotDetailsTables();
  updateAllPilots(numberOfPilots, numberOfRowsPilots);
  attachSaveTriggers();
  updateArrayPilotNames(numberOfPilots);
  updateArrayPilotRank(numberOfPilots);
  updateArrayNotifyEmail(numberOfPilots);
  updatePilotHeadlines();
  updateDetailArrayFromIds(numberOfFixItems, numberOfPilots);
  updateArrayFixTask(numberOfFixTask, numberOfPilots);
  
}, 100);


//------------------🌍 Exports ans Window für Debugging ------------------//
window.updateAllPilots = () => updateAllPilots(numberOfPilots, numberOfRowsPilots);
window.updatePilotDropdownFromTable = updatePilotDropdownFromTable;
window.openTab = openTab;
window.updatePilotHeadlines = updatePilotHeadlines;
window.pilotNames = pilotNames;
window.numberOfPilots = numberOfPilots;


//------------------🗃 Kommentare & Historie (aufbewahren) ------------------//
/*
// Funktion zum Speichern der Pilot-Fix-Item-Tabelle
function saveTableFixItems() { ... }

// Funktion zum Laden der Pilot-Fix-Item-Tabelle
function loadTableFixItems() { ... }

// Funktion zum Speichern der Pilot-Fix-Task-Tabelle
function saveTableFixTasks() { ... }

// Funktion zum Laden der Pilot-Fix-Task-Tabelle
function loadTableFixTasks() { ... }
*/