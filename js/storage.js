

console.log("storage.js geladen");

const company1 = "fgpilot";

// storage.js

//------------------Pilots Tables Container (Save & Load)-------------------

let allDataPilotTablesContainer = {};

export function saveAllPilotTables() {
  const container = document.getElementById("pilotTablesContainer");
  const tables = container.querySelectorAll("table");
  allDataPilotTablesContainer = {};

  tables.forEach((table) => {
    const tableId = table.id;
    const tableData = [];

    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll("td, th");
      cells.forEach((cell) => {
        const input = cell.querySelector("input");
        if (input) {
          if (input.type === "checkbox") {
            rowData.push(input.checked);
          } else {
            rowData.push(input.value);
          }
        } else {
          rowData.push(cell.textContent.trim());
        }
      });
      tableData.push(rowData);
    });

    allDataPilotTablesContainer[tableId] = tableData;

  });
  saveTrackerData();
//  localStorage.setItem("pilotTablesData", JSON.stringify(allDataPilotTablesContainer));
  console.log("✅ Tabellen mit Input-Feldern gespeichert.");
}


export function loadAllPilotTablesWithData(data) {
  if (!data) return;

  for (const tableId in data) {
    const table = document.getElementById(tableId);
    if (!table) continue;

    const rows = table.querySelectorAll("tr");
    data[tableId].forEach((rowData, rowIndex) => {
      const cells = rows[rowIndex]?.querySelectorAll("td, th");
      if (!cells) return;

      rowData.forEach((value, cellIndex) => {
        const cell = cells[cellIndex];
        const input = cell.querySelector("input");

        if (input) {
          if (input.type === "checkbox") {
            input.checked = value === true;
          } else {
            input.value = value;
          }
        } else {
          cell.textContent = value;
        }
      });
    });
  }
}


export function loadAllPilotDetailsTablesWithData(data) {
  if (!data) return;

  for (const tableId in data) {
    const table = document.getElementById(tableId);
    if (!table) continue;

    const rows = table.querySelectorAll("tr");
    data[tableId].forEach((rowData, rowIndex) => {
      const cells = rows[rowIndex]?.querySelectorAll("td, th");
      if (!cells) return;

      rowData.forEach((value, cellIndex) => {
        const cell = cells[cellIndex];
        const input = cell.querySelector("input");

        if (input) {
          if (input.type === "checkbox") {
            input.checked = value === true;
          } else {
            input.value = value;
          }
        } else {
          cell.textContent = value;
        }
      });
    });
  }
}



/*
export function loadAllPilotTables(updateAllPilotsFn) {
  const savedData = localStorage.getItem("pilotTablesData");
  if (!savedData) return;

  const allData = JSON.parse(savedData);

  for (const tableId in allData) {
    const table = document.getElementById(tableId);
    if (!table) continue;

    const rows = table.querySelectorAll("tr");
    allData[tableId].forEach((rowData, rowIndex) => {
      const cells = rows[rowIndex]?.querySelectorAll("td, th");
      if (!cells) return;

      rowData.forEach((value, cellIndex) => {
        const cell = cells[cellIndex];
        const input = cell.querySelector("input");

        if (input) {
          if (input.type === "checkbox") {
            input.checked = value === true;
          } else {
            input.value = value;
          }
        } else {
          cell.textContent = value;
        }
      });
    });
  }


  // Ruft update-Funktion auf, wenn vorhanden
  if (typeof updateAllPilotsFn === "function") {
    updateAllPilotsFn();
  }

  console.log("✅ Piloten-Tabellen erfolgreich wiederhergestellt.");
}
*/


//------------------------Pilot Details Container (Save & Load)----------------

let allDataPilotDetailsContainer = {};

export function saveAllPilotDetailsTables() {
  const container = document.getElementById("pilotDetailsContainer");
  const tables = container.querySelectorAll("table");
  allDataPilotDetailsContainer = {};

  tables.forEach((table) => {
    const tableId = table.id;
    const tableData = [];

    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll("td, th");
      cells.forEach((cell) => {
        const input = cell.querySelector("input");
        if (input) {
          if (input.type === "checkbox") {
            rowData.push(input.checked);
          } else {
            rowData.push(input.value);
          }
        } else {
          rowData.push(cell.textContent.trim());
        }
      });
      tableData.push(rowData);
    });

    allDataPilotDetailsContainer[tableId] = tableData;
  });
  saveTrackerData();
//  localStorage.setItem("pilotDetailsData", JSON.stringify(allDataPilotDetailsContainer));
  console.log("✅ Detail Tabellen mit Input-Feldern gespeichert.");
}


/*
export function loadAllPilotDetailsTables() {
  const savedData = localStorage.getItem("pilotDetailsData");
  if (!savedData) return;

  const allData = JSON.parse(savedData);

  for (const tableId in allData) {
    const table = document.getElementById(tableId);
    if (!table) continue;

    const rows = table.querySelectorAll("tr");
    allData[tableId].forEach((rowData, rowIndex) => {
      const cells = rows[rowIndex]?.querySelectorAll("td, th");
      if (!cells) return;

      rowData.forEach((value, cellIndex) => {
        const cell = cells[cellIndex];
        const input = cell.querySelector("input");

        if (input) {
          if (input.type === "checkbox") {
            input.checked = value === true;
          } else {
            input.value = value;
          }
        } else {
          cell.textContent = value;
        }
      });
    });
  }
}
*/

import { pilotNames, pilotRank, notifyEmailPilots, fixedDetailItems, fixedTaskItems, adminTableArray, pilotComments } from './arrays.js';

export function saveTrackerData() {
  fetch("http://217.154.84.3:3000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: `${company1}`,
      data: { 
        pilotNames,
        pilotRank,
        notifyEmailPilots,
        fixedDetailItems,
        fixedTaskItems,
        adminTableArray,
        pilotComments,
        allDataPilotTablesContainer,
        allDataPilotDetailsContainer
      }
    })
  })
  .then(res => res.text())
  .then(data => console.log("✅ Auf dem Server gespeichert:", data))
  .catch(error => console.error("❌ Fehler beim Speichern:", error));
};


export async function loadTrackerData() {
  try {
    const response = await fetch(`http://217.154.84.3:3000/load/${company1}`);
    if (!response.ok) throw new Error("Serverantwort fehlgeschlagen");

    const data = await response.json();
    // const data = result.data;

    // Arrays überschreiben
    pilotNames.length = 0;
    pilotNames.push(...data.pilotNames);
    pilotRank.length = 0;
    pilotRank.push(...data.pilotRank);
    notifyEmailPilots.length = 0;
    notifyEmailPilots.push(...data.notifyEmailPilots);
    fixedDetailItems.length = 0;
    fixedDetailItems.push(...data.fixedDetailItems);
    fixedTaskItems.length = 0;
    fixedTaskItems.push(...data.fixedTaskItems);
    adminTableArray.length = 0;
    adminTableArray.push(...data.adminTableArray);
    pilotComments.length = 0;
    pilotComments.push(...data.pilotComments);

    // Object.assign(pilotComments, data.pilotComments);

    // Tabellen laden (mit übergebenem Datenobjekt)
    loadAllPilotTablesWithData(data.allDataPilotTablesContainer);
    loadAllPilotDetailsTablesWithData(data.allDataPilotDetailsContainer);

    console.log("✅ Tracker-Daten vom Server geladen");
  } catch (error) {
    console.error("❌ Fehler beim Laden:", error);
  }
}


