
//----------------- allgemeine CONST-anten ----------------

const numberOfPilots = 10; // Pilotenzahl zur Erstellung der Tabellen
const numberOfRowsPilots = 15; // Anzahl der Reihen pro Pilotentabelle
const numberOfRowsDetail = 15; // Anzahl der Reihen der Info-Item / Detail Tabellen
const numberOfRowsTask = 15; // Anzahl der Reihen der Initial-Task-Item Tabellen
const numberOfFixItems = 8; // Anzahl der Fix-Items in der Fix-Detail-Item Tabelle
const numberOfFixTask = 8; // Anzahl der Fix-Initial-Task-Items



// main.js
import { loadAllPilotTables, saveAllPilotTables } from './storage.js';

// Beispiel-Wrapper für update-Funktion (kommt aus späterem Modul)
function updateAllPilotsWrapper() {
  // später aus calculation.js importieren
  console.log("🔁 Dummy updateAllPilots aufgerufen (noch nicht verlinkt)");
}

window.addEventListener("DOMContentLoaded", () => {
  loadAllPilotTables(updateAllPilotsWrapper);
});

// Beispiel: später bei Eingabe automatisch speichern
// saveAllPilotTables(); // kannst du später aus Event-Handlern aufrufen

import { openTab, updatePilotDropdownFromTable } from './ui.js';

// Diese Zeile fehlt (und löst dein Problem):
window.updatePilotDropdownFromTable = updatePilotDropdownFromTable;

window.openTab = openTab;



/*
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");

  // Wenn es sich um einen Pilotentab handelt (z. B. "pilot3")
  if (tabName.startsWith("pilot")) {
    const pilotNumber = parseInt(tabName.replace("pilot", ""));

    for (let i = 1; i <= numberOfPilots; i++) {
      const wrapper = document.getElementById(`pilotWrapper${i}`);
      if (wrapper) wrapper.style.display = "none";     
    }

    const active = document.getElementById(`pilotWrapper${pilotNumber}`);
    if (active) active.style.display = "block";
  }
}
*/


//-----------------Initial für die Berechnung---------------------------

// live update; live Tabellen Berechnung/calculation
//for (let p = 1; p <= numberOfPilots; p++) {
  //setupLiveCalculation(p, numberOfRowsPilots);
//}


//-------------------Automatisches Array Pilot Names---------------------------

let pilotNames = [];

function updateArrayPilotNames() {
  pilotNames = [];

  // Anzahl der Piloten; numberOfPilots; siehe oben, const ---------------
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`pilotName${i}`);
    pilotNames.push(cell.textContent.trim());

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        pilotNames[i] = cell.textContent.trim();
        updatePilotParagraph();
        updatePilotHeadlines();      // 👈 Jetzt wird der Titel live aktualisiert!
        console.log("pilotNames Array aktualisiert:", pilotNames);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}

updateArrayPilotNames(); // <-- Jetzt aktiv!


//-------------------Automatisches Array Pilot Rank---------------------------

let pilotRank = [];

function updateArrayPilotRank() {
  pilotRank = [];

  // Anzahl der Piloten; numberOfPilots; siehe oben, const ---------------
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`rankPilot${i}`);
    pilotRank.push(cell.textContent.trim());

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        pilotRank[i] = cell.textContent.trim();
        updatePilotParagraphRank();   // jetzt wird der Rank in html/Tabellen id angezeigt
        updatePilotHeadlines();      // 👈 Jetzt wird der Titel live aktualisiert!
        console.log("pilotRank Array aktualisiert:", pilotRank);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}

updateArrayPilotRank(); // <-- Jetzt aktiv!


//-------------------Automatisches Array notify-email der Piloten------------------

let notifyEmailPilots = [];

function updateArrayNotifyEmail() {
  notifyEmailPilots = [];

  // Anzahl der Piloten; numberOfPilots; siehe oben, const ---------------
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`notifyEmailPilot${i}`);
    notifyEmailPilots.push(cell.textContent.trim());

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        notifyEmailPilots[i] = cell.textContent.trim();
        console.log("notifyEmailPilots Array aktualisiert:", notifyEmailPilots);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}

updateArrayNotifyEmail(); // <-- Jetzt aktiv!


//-----------------Update der Headlines-----------------------------

function updatePilotHeadlines() {
  for (let i = 0; i < pilotNames.length; i++) {
    const headline = document.getElementById(`headPilot${i + 1}`);
    if (headline) {
      const spacer = "\u2003"; // EM SPACE
      headline.textContent = pilotNames[i] + spacer + "|" + spacer + pilotRank[i];
    }
  }
}


//------------------Create Pilot-Table----------------------------

function createPilotTable(pilotNumber) {
  const table = document.createElement('table');
  table.id = `editableTablePilot${pilotNumber}`;

  // Kopfzeile
  table.innerHTML = `
    <tr><th colspan="9" class="headTable" id="headPilot${pilotNumber}"></th></tr>
    <tr>
      <th>License</th>
      <th>Last Check</th>
      <th title="in Months">Validity</th>
      <th>Expiry Date</th>
      <th>rem. Days</th>
      <th colspan="3" id="emailSent">Email sent</th>
      <th>Scheduled slot</th>
    </tr>
  `;
  
  // Datenzeilen
  for (let i = 1; i <= numberOfRowsPilots; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td contenteditable="true" class="green"></td>
      <td><input type="date" class="inputDate" id="lastCheckLiLane${i}Pilot${pilotNumber}"></td>
      <td contenteditable="true" class="inputValidity" id="validityLiLane${i}Pilot${pilotNumber}"></td>
      <td id="newExpiryDateLiLane${i}Pilot${pilotNumber}"></td>
      <td id="remDaysLiLane${i}Pilot${pilotNumber}"></td>
      <td><input type="checkbox" value="sent" id="emailSent30LiLane${i}Pilot${pilotNumber}">30</td>
      <td><input type="checkbox" value="sent" id="emailSent60LiLane${i}Pilot${pilotNumber}">60</td>
      <td><input type="checkbox" value="sent" id="emailSent90LiLane${i}Pilot${pilotNumber}">90</td>
      <td><input type="date" class="inputDate" id="newEventLiLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }

  return table;
}

// Tabellen erzeugen und anhängen
const container = document.getElementById('pilotTablesContainer');
for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(createPilotTable(pilot));
  container.appendChild(wrapper);
}

/*
//---------------DropDown (Piloten) automatische Namen---------

function updatePilotDropdownFromTable() {
  const pilotDropdown = document.getElementById("pilotDropdown");
  pilotDropdown.innerHTML = ""; // Vorher leeren

  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`pilotName${i}`);
    const name = cell?.textContent.trim() || `Pilot ${i + 1}`;

    const a = document.createElement("a");
    a.className = "tablinks";
    a.textContent = name;
    a.href = "#";
    a.onclick = (event) => openTab(event, `pilot${i + 1}`);
    pilotDropdown.appendChild(a);
  }
}
*/

//------------------Automatische update der Piloten Tabelle------------

// live update
for (let p = 1; p <= numberOfPilots; p++) {
  setupLiveCalculation(p, numberOfRowsPilots);
}


//--------------Namen aus dem Array für die Piloten Details im html anzeigen----------

function updatePilotParagraph() {
  for (let i = 0; i < pilotNames.length; i++) {
  const p = document.getElementById(`pilot${i + 1}Name`);
  if (p) p.textContent = pilotNames[i];
  }
}

function updatePilotParagraphRank() {
  for (let i = 0; i < pilotRank.length; i++) {
    const pRank = document.getElementById(`pilot${i + 1}Rank`);
    if (pRank) pRank.textContent = pilotRank[i];
  }
}


//-------------Tabellen Berechnung--------------------


// 📅 Datum formatiert als dd.mm.yyyy
function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// 🧮 Berechne eine Zeile (Pilot & Zeilennummer)
function calculateRow(pilotNumber, rowNumber) {
  const lastCheckInput = document.getElementById(`lastCheckLiLane${rowNumber}Pilot${pilotNumber}`);
  const validityCell = document.getElementById(`validityLiLane${rowNumber}Pilot${pilotNumber}`);
  const expiryCell = document.getElementById(`newExpiryDateLiLane${rowNumber}Pilot${pilotNumber}`);
  const remDaysCell = document.getElementById(`remDaysLiLane${rowNumber}Pilot${pilotNumber}`);

  if (!lastCheckInput || !validityCell || !expiryCell || !remDaysCell) return;

  const lastCheck = new Date(lastCheckInput.value);
  const validity = parseInt(validityCell.textContent);
  if (isNaN(validity) || isNaN(lastCheck)) return;

  const expiryDate = new Date(lastCheck);
  expiryDate.setMonth(expiryDate.getMonth() + validity);

  const today = new Date();
  const remDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  expiryCell.textContent = formatDate(expiryDate);
  remDaysCell.textContent = remDays;

  remDaysCell.style.backgroundColor =
    remDays <= 0 ? "lightcoral" : remDays <= 60 ? "yellow" : remDays <= 90 ? "lightyellow" : "rgb(168, 185, 170)";



  // 📨 Automatische E-Mail bei Fälligkeit
  const licenseCell = document.querySelector(`#editableTablePilot${pilotNumber} tr:nth-child(${rowNumber + 2}) td:nth-child(1)`);
  const licenseName = licenseCell ? licenseCell.textContent.trim() : "your license";

  const recipient = `pilot${pilotNumber}@abc.com`; // oder aus deinem Array: pilotEmail[pilotNumber - 1]
  const ccRecipient = 'xxx@abc.com, xyz@abc.com'; // cc noch nicht definiert

  function sendEmail(remDays, checkboxId) {
    const subject = `Automated Email - ${licenseName}`;
    const body = `Your ${licenseName} is going to expire. ${remDays} days left. Please contact xxx.`; // ...please contact OPS Büro?
    const mailtoLink = `mailto:${recipient}?cc=${encodeURIComponent(ccRecipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    document.getElementById(checkboxId).checked = true;
  }

  // Prüfen & Mail starten
  if (remDays <= 30) {
    const cb30 = `emailSent30LiLane${rowNumber}Pilot${pilotNumber}`;
    if (!document.getElementById(cb30).checked) sendEmail(30, cb30);
  } else if (remDays <= 60) {
    const cb60 = `emailSent60LiLane${rowNumber}Pilot${pilotNumber}`;
    if (!document.getElementById(cb60).checked) sendEmail(60, cb60);
  } else if (remDays <= 90) {
    const cb90 = `emailSent90LiLane${rowNumber}Pilot${pilotNumber}`;
    if (!document.getElementById(cb90).checked) sendEmail(90, cb90);
  }
}


// 🔄 Aktualisiere ALLE Piloten
function updateAllPilots(numberOfPilots, numberOfRowsPilots) {
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    updatePilotTable(pilot, numberOfRowsPilots);
  }
}

// 🔁 Aktualisiere alle Zeilen eines Piloten
function updatePilotTable(pilotNumber, numberOfRowsPilots) {
  for (let row = 1; row <= numberOfRowsPilots; row++) {
    calculateRow(pilotNumber, row);
  }
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



//-------------------Automatisches Array Fix Detail Items---------------------------

let fixedDetailItems = [];

function updateDetailArrayFromIds() {
  fixedDetailItems = [];

  //const numberOfFixItems = 8; Fix-Detail-Items; siehe oben
  for (let i = 0; i < numberOfFixItems; i++) {
    const cell = document.getElementById(`fixedDetailedItem${i}`);
    fixedDetailItems.push(cell.textContent.trim());

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        fixedDetailItems[i] = cell.textContent.trim();
        for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedDetailItems(p);
        }
        console.log("Fix Detail Array aktualisiert:", fixedDetailItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}
updateDetailArrayFromIds();



//---------------Füge die Vorgaben in die Pilot Detail Tabellen -------------

function insertFixedDetailItems(pilotNumber) {
  for (let i = 0; i < fixedDetailItems.length; i++) {
    const cellId = `itemDetailLane${i + 1}Pilot${pilotNumber}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedDetailItems[i];
    }
  }
}


//-------------------Automatisches Array Fix Initial Task Items---------------------------

let fixedTaskItems = [];

function updateArrayFixTask() {
  fixedTaskItems = [];

  //const numberOfFixItems = 8; Fix-Detail-Items; siehe oben
  for (let i = 0; i < numberOfFixTask; i++) {
    const cell = document.getElementById(`fixedInitialTaskItem${i}`);
    fixedTaskItems.push(cell.textContent.trim());

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        fixedTaskItems[i] = cell.textContent.trim();
        for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedTaskItems(p);
        }
        console.log("Fix Task Array aktualisiert:", fixedTaskItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}
updateArrayFixTask();



//---------------Füge die Vorgaben in die Pilot Initial-Task Tabellen -------------

function insertFixedTaskItems(pilotNumber) {
  for (let i = 0; i < fixedTaskItems.length; i++) {
    const cellId = `itemCompanyLane${i + 1}Pilot${pilotNumber}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedTaskItems[i];
    }
  }
}





//------------------Create Pilot Details Table----------------------------

function createPilotDetailTable(pilotNumber) {
  const table = document.createElement('table');
  // Anzahl der fixen (nicht editierbaren) Zeilen
  // const numberOfFixedItems = 8;
  table.id = `detailTablePilot${pilotNumber}`;

  // Kopfzeile
  table.innerHTML = `
    <tr>
      <th class="headTable">Info-Item</th>
      <th class="headTable">Detail</th>
    </tr>
  `;
  
  // Datenzeilen
  for (let i = 1; i <= numberOfRowsDetail; i++) {
    const row = document.createElement('tr');
    const isFixed = i <= numberOfFixItems;
    row.innerHTML = `
      <td ${isFixed ? "" + 'class="fixItem"' + 'title="Fix Item from Setup"': 'contenteditable="true"'} class="detailTable" id="itemDetailLane${i}Pilot${pilotNumber}"></td>
      <td contenteditable="true" class="detailTable" id="inputDetailLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }
  
  return table;
}


//------------------Create Pilot Company Table (Initial-Task-Item)----------------------------

function createPilotCompanyTable(pilotNumber) {
  const table = document.createElement('table');
  table.id = `detailCompanyPilot${pilotNumber}`;

  // Kopfzeile
  table.innerHTML = `
    <tr>
      <th class="headTable">Initial-Task-Item</th>
      <th class="headTable">Date</th>
      <th class="headTable">Passed</th>
    </tr>
  `;
  
  // Datenzeilen
  for (let i = 1; i <= numberOfRowsTask; i++) {
    const row = document.createElement('tr');
    const isFixed = i <= numberOfFixTask;
    row.innerHTML = `
      <td ${isFixed ? "" + 'class="fixItem"' + 'title="Fix Task from Setup"': 'contenteditable="true"'} class="detailTable" id="itemCompanyLane${i}Pilot${pilotNumber}"></td>
      <td><input type="date" class="inputDate" id="dateCompanyLane${i}Pilot${pilotNumber}"></td>
      <td><input type="checkbox" value="passed" id="itemCompanyPassedLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }

  return table;
}


// Den Pilot Detail Container erstellen und die beiden Tabellen einschreiben/erzeugen (Info and Initial-Task)---------

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
  subWrapper.appendChild(createPilotDetailTable(pilot));
  subWrapper.appendChild(createPilotCompanyTable(pilot));
  wrapper.appendChild(subWrapper);

  detailContainer.appendChild(wrapper);
 
}







//---------------hier wird die Funktion (fixe Werte in Pilot Detail Tabelle) aufgerufen--------

//for (let pilotNumber = 1; pilotNumber <= numberOfPilots; pilotNumber++) {
  //insertFixedDetailItems(pilotNumber);
//}


/*
//-------------local storage - pilotTablesContainer - für jede Tabelle - Zelle für Zelle---------------


function saveAllPilotTables() {
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
          } else if (input.type === "date") {
            rowData.push(input.value);
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



//-------- Tabellen laden - pilotTablesContainer----------

function loadAllPilotTables() {
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

  updateAllPilots(numberOfPilots, numberOfRowsPilots);
  console.log("✅ Piloten-Tabellen erfolgreich wiederhergestellt.");
}
*/



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


