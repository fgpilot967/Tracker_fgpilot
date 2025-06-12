
//-------------------Automatisches Array Pilot Names---------------------------

export let pilotNames = [];

export function updateArrayPilotNames(numberOfPilots) {
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



//-------------------Automatisches Array Pilot Rank---------------------------

export let pilotRank = [];

export function updateArrayPilotRank(numberOfPilots) {
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



//-------------------Automatisches Array notify-email der Piloten------------------

export let notifyEmailPilots = [];

export function updateArrayNotifyEmail(numberOfPilots) {
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



//-------------------Automatisches Array Fix Detail Items---------------------------

export let fixedDetailItems = [];

export function updateDetailArrayFromIds(numberOfFixItems, numberOfPilots) {
  fixedDetailItems = [];
    const saved = localStorage.getItem("fixedDetailItems");
    if (saved) {
      try {
        fixedDetailItems = JSON.parse(saved);
      } catch (e) {
        console.warn("Fehler beim Parsen von fixedDetailItems aus localStorage", e);
        fixedDetailItems = [];
      }
    }

  //const numberOfFixItems = 8; Fix-Detail-Items; siehe oben
  for (let i = 0; i < numberOfFixItems; i++) {
    const cell = document.getElementById(`fixedDetailedItem${i}`);
    //fixedDetailItems.push(cell.textContent.trim());
    const value = saved ? fixedDetailItems[i] : cell.textContent.trim();
    fixedDetailItems[i] = value;
    cell.textContent = value;

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        fixedDetailItems[i] = cell.textContent.trim();
        localStorage.setItem("fixedDetailItems", JSON.stringify(fixedDetailItems));  // 🆕
        for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedDetailItems(p);
        }
        console.log("Fix Detail Array aktualisiert:", fixedDetailItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
  for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedDetailItems(p);
  }
}

//---------------Füge die Vorgaben in die Pilot Detail Tabellen -------------

export function insertFixedDetailItems(p) {
  for (let i = 0; i < fixedDetailItems.length; i++) {
    const cellId = `itemDetailLane${i + 1}Pilot${p}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedDetailItems[i];
    }
  }
}


//-------------------Automatisches Array Fix Initial Task Items---------------------------

export let fixedTaskItems = [];

export function updateArrayFixTask(numberOfFixTask) {
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



//---------------Füge die Vorgaben in die Pilot Initial-Task Tabellen -------------

export function insertFixedTaskItems(fixedTaskItems) {
  for (let i = 0; i < fixedTaskItems.length; i++) {
    const cellId = `itemCompanyLane${i + 1}Pilot${pilotNumber}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedTaskItems[i];
    }
  }
}

