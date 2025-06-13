
// main.js

//----------------- Globale CONST-anten ----------------
const numberOfPilots = 10; // Pilotenzahl zur Erstellung der Tabellen
const numberOfRowsPilots = 15; // Anzahl der Reihen pro Pilotentabelle
const numberOfRowsDetail = 15; // Anzahl der Reihen der Info-Item / Detail Tabellen
const numberOfRowsTask = 15; // Anzahl der Reihen der Initial-Task-Item Tabellen
const numberOfFixItems = 8; // Anzahl der Fix-Items in der Fix-Detail-Item Tabelle
const numberOfFixTask = 8; // Anzahl der Fix-Initial-Task-Items




window.addEventListener("DOMContentLoaded", () => {
  loadAllPilotTables(() => {
    updateAllPilots(numberOfPilots, numberOfRowsPilots);
    attachSaveTriggers();

    updateArrayPilotNames(numberOfPilots);
    updateArrayPilotRank(numberOfPilots);
    updateArrayNotifyEmail(numberOfPilots);
    updateDetailArrayFromIds(numberOfFixItems, numberOfPilots);
    updateArrayFixTask(numberOfFixTask, numberOfPilots);

    updatePilotHeadlines();

  });
});



import {
  createPilotTable,
  createPilotDetailTable,
  createPilotCompanyTable
} from './pilotTables.js';

import { loadAllPilotTables, saveAllPilotTables } from './storage.js';

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




// Tabellen erzeugen und anhängen
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
  wrapper.className = "tabcontent"; // optional, für Tab-Logik
  wrapper.style.display = "none";

  const subWrapper = document.createElement('div');
  subWrapper.style.display = "flex";
  subWrapper.style.alignItems = "flex-start"; // passt die folgende Tabelle nicht der vorherigen an
  subWrapper.style.gap = "300px";
  subWrapper.appendChild(createPilotDetailTable(pilot, numberOfRowsDetail, numberOfFixItems));
  subWrapper.appendChild(createPilotCompanyTable(pilot, numberOfRowsTask, numberOfFixItems));
  wrapper.appendChild(subWrapper);

  detailContainer.appendChild(wrapper); 
}



//   ?????????
// Beispiel-Wrapper für update-Funktion (kommt aus späterem Modul)
function updateAllPilotsWrapper() {
  // später aus calculation.js importieren
  console.log("🔁 Dummy updateAllPilots aufgerufen (noch nicht verlinkt)");
}

//window.addEventListener("DOMContentLoaded", () => {
  //loadAllPilotTables(updateAllPilotsWrapper);
//});



loadAllPilotTables(() => {
  setTimeout(() => {
    updateAllPilots(numberOfPilots, numberOfRowsPilots);
  }, 50); // 50–100 ms reichen meist aus
});



window.updateAllPilots = () => updateAllPilots(numberOfPilots, numberOfRowsPilots);

window.updatePilotDropdownFromTable = updatePilotDropdownFromTable;

window.openTab = openTab;

window.updatePilotHeadlines = updatePilotHeadlines;

window.pilotNames = pilotNames;




//------------------Automatische update der Piloten Tabelle------------

// live update
for (let p = 1; p <= numberOfPilots; p++) {
  setupLiveCalculation(p, numberOfRowsPilots);
}



//  Live-Berechnung aktivieren
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




// Funktion zum Speichern der Pilot-List-Tabelle -------------------
function saveTablePilotList() {
    const table = document.getElementById("editableTablePilotList");
    const rows = table.rows;
    const tableData = [];

    for (let i = 1; i < rows.length; i++) {  // i=1 um Kopfzeile zu überspringen
        const rowData = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
            const cell = rows[i].cells[j];
            rowData.push(cell.textContent.trim()); // 🔁 DAS hat gefehlt! push den cell.textcontent in das rowData
        }
        tableData.push(rowData); // push das rowData-Array in das tableData-Array
    }

    localStorage.setItem("TablePilotList", JSON.stringify(tableData));
    console.log("Pilot-List gespeichert");
}


// Funktion zum Laden der Pilot-List-Tabelle--------------------
function loadTablePilotList() {
    const table = document.getElementById("editableTablePilotList");
    const storedData = JSON.parse(localStorage.getItem("TablePilotList"));

    if (storedData) {
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = storedData[i - 1]; // 📌 Index aus gespeichertem Array

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



/*
// Funktion zum Speichern der Pilot-Fix-Item-Tabelle -------------------
function saveTableFixItems() {
    const table = document.getElementById("fixTablePilotDetails");
    const rows = table.rows;
    const tableData = [];

    for (let i = 1; i < rows.length; i++) {  // i=1 um Kopfzeile zu überspringen
        const rowData = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
            const cell = rows[i].cells[j];
            rowData.push(cell.textContent.trim()); // 🔁 DAS hat gefehlt! push den cell.textcontent in das rowData
        }
        tableData.push(rowData); // push das rowData-Array in das tableData-Array
    }

    localStorage.setItem("TableFixItems", JSON.stringify(tableData));
    console.log("✅ Pilot-Fix-Items gespeichert");
}


// Funktion zum Laden der Pilot-Fix-Item-Tabelle--------------------
function loadTableFixItems() {
    const table = document.getElementById("fixTablePilotDetails");
    const storedData = JSON.parse(localStorage.getItem("TableFixItems"));

    if (storedData) {
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = storedData[i - 1]; // 📌 Index aus gespeichertem Array

            if (rowData) {
                for (let j = 0; j < row.cells.length; j++) {
                    row.cells[j].textContent = rowData[j] || "";
                }
            }
        }
        console.log("✅ Pilot-Fix-Items geladen");
    } else {
        console.log("Keine gespeicherten Daten für Pilot-Fix-Items gefunden.");
    }

    
    updateDetailArrayFromIds();

    for (let pilotNumber = 1; pilotNumber <= numberOfPilots; pilotNumber++) {
    insertFixedDetailItems(pilotNumber);
    }
    
}

// Funktion zum Speichern der Pilot-Fix-Task-Tabelle -------------------
function saveTableFixTasks() {
    const table = document.getElementById("fixTablePilotInitialTask");
    const rows = table.rows;
    const tableData = [];

    for (let i = 1; i < rows.length; i++) {  // i=1 um Kopfzeile zu überspringen
        const rowData = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
            const cell = rows[i].cells[j];
            rowData.push(cell.textContent.trim()); // 🔁 DAS hat gefehlt! push den cell.textcontent in das rowData
        }
        tableData.push(rowData); // push das rowData-Array in das tableData-Array
    }

    localStorage.setItem("TableTaskItems", JSON.stringify(tableData));
    console.log("✅ Pilot-Fix-Tasks gespeichert");
}


// Funktion zum Laden der Pilot-Fix-Task-Tabelle--------------------
function loadTableFixTasks() {
    const table = document.getElementById("fixTablePilotInitialTask");
    const storedData = JSON.parse(localStorage.getItem("TableTaskItems"));

    if (storedData) {
        for (let i = 1; i < table.rows.length; i++) {
            const row = table.rows[i];
            const rowData = storedData[i - 1]; // 📌 Index aus gespeichertem Array

            if (rowData) {
                for (let j = 0; j < row.cells.length; j++) {
                    row.cells[j].textContent = rowData[j] || "";
                }
            }
        }
        console.log("✅ Pilot-Fix-Tasks geladen");
    } else {
        console.log("Keine gespeicherten Daten für Pilot-Fix-Tasks gefunden.");
    }

    
    updateArrayFixTask();

    for (let pilotNumber = 1; pilotNumber <= numberOfPilots; pilotNumber++) {
    insertFixedTaskItems(pilotNumber);
    }
    
}
*/

