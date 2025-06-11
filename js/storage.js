
// storage.js

export function saveAllPilotTables() {
  const container = document.getElementById("pilotTablesContainer");
  const tables = container.querySelectorAll("table");
  const allData = {};

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

    allData[tableId] = tableData;
  });

  localStorage.setItem("pilotTablesData", JSON.stringify(allData));
  console.log("✅ Tabellen mit Input-Feldern gespeichert.");
}

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


