
/*
 * arrays.js
 * Enthält:
 * 1. updatePilotHeadlines()
 * 2. Pilot Data Arrays: pilotNames, pilotRank, notifyEmailPilots
 * 3. Fixed Detail Items & Task Items
 * Alle Funktionen greifen direkt auf DOM-Elemente zu & speichern in localStorage
 */


console.log("Arrays.js geladen");


//-----------------Update der Piloten-Tabellen Headline-Anzeige-----------------------------

export function updatePilotHeadlines() {
  console.log("Headlines aktualisiert");
  for (let i = 0; i < pilotNames.length; i++) {
    const headline = document.getElementById(`headPilot${i + 1}`);
    if (headline) {
      const spacer = "\u2003"; // EM SPACE
      headline.textContent = pilotNames[i] + spacer + "|" + spacer + pilotRank[i];
    }
  }
}


//-------------------Pilot Names (Array & DOM)---------------------------

export let pilotNames = [];

export function updateArrayPilotNames(numberOfPilots) {
  pilotNames = [];
  const saved = localStorage.getItem("pilotNames");
    if (saved) {
      try {
        pilotNames = JSON.parse(saved);
      } catch (e) {
        console.warn("Fehler beim Parsen von pilotNames aus localStorage", e);
        pilotNames = [];
      }
    }
  
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`pilotName${i}`);
    const value = saved ? pilotNames[i] : cell.textContent.trim();
    pilotNames[i] = value;
    cell.textContent = value;

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        pilotNames[i] = cell.textContent.trim();
        localStorage.setItem("pilotNames", JSON.stringify(pilotNames));
        for (let p = 1; p <= numberOfPilots; p++) {
          updatePilotParagraph(p);
        }
        console.log("pilotNames Array aktualisiert:", pilotNames);
        updatePilotHeadlines();
      });
      cell.dataset.listenerAdded = "true";
    }
  }  
  updatePilotParagraph();
}

export function updatePilotParagraph() {
  console.log("Paragraph aktualisiert");
  for (let i = 0; i < pilotNames.length; i++) {
    const p = document.getElementById(`pilot${i + 1}Name`);
    if (p) p.textContent = pilotNames[i];
  }
}


//-------------------Pilot Rank (Array & DOM)---------------------------

export let pilotRank = [];

export function updateArrayPilotRank(numberOfPilots) {
  pilotRank = [];
  const saved = localStorage.getItem("pilotRank");
    if (saved) {
      try {
        pilotRank = JSON.parse(saved);
      } catch (e) {
        console.warn("Fehler beim Parsen von pilotRank aus localStorage", e);
        pilotRank = [];
      }
    }
  
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`rankPilot${i}`);
    const value = saved ? pilotRank[i] : cell.textContent.trim();
    pilotRank[i] = value;
    cell.textContent = value;

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        pilotRank[i] = cell.textContent.trim();
        localStorage.setItem("pilotRank", JSON.stringify(pilotRank));
        for (let p = 1; p <= numberOfPilots; p++) {
          updatePilotParagraphRank(p);
        }
        console.log("pilotRank Array aktualisiert:", pilotRank);
        updatePilotHeadlines();
      });
      cell.dataset.listenerAdded = "true";
    }
  }
  updatePilotParagraphRank();
}

export function updatePilotParagraphRank() {
  console.log("Rank aktualisiert");
  for (let i = 0; i < pilotRank.length; i++) {
    const pRank = document.getElementById(`pilot${i + 1}Rank`);
    if (pRank) pRank.textContent = pilotRank[i];
  }
}


//-------------------Notify-Emails der Piloten (Array & DOM)------------------

export let notifyEmailPilots = [];

export function updateArrayNotifyEmail(numberOfPilots) {
  notifyEmailPilots = [];
    const saved = localStorage.getItem("notifyEmailPilots");
    if (saved) {
      try {
        notifyEmailPilots = JSON.parse(saved);
      } catch (e) {
        console.warn("Fehler beim Parsen von notifyEmailPilots aus localStorage", e);
        notifyEmailPilots = [];
      }
    }
  
  for (let i = 0; i < numberOfPilots; i++) {
    const cell = document.getElementById(`notifyEmailPilot${i}`);
    const value = saved ? notifyEmailPilots[i] : cell.textContent.trim();
    notifyEmailPilots[i] = value;
    cell.textContent = value;

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        notifyEmailPilots[i] = cell.textContent.trim();
        localStorage.setItem("notifyEmailPilots", JSON.stringify(notifyEmailPilots));
        console.log("notifyEmailPilots Array aktualisiert:", notifyEmailPilots);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
}


//-------------------Fix Detail Items (Fix-Items for Pilot Details)---------------------------

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

  for (let i = 0; i < numberOfFixItems; i++) {
    const cell = document.getElementById(`fixedDetailedItem${i}`);
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

export function insertFixedDetailItems(p) {
  for (let i = 0; i < fixedDetailItems.length; i++) {
    const cellId = `itemDetailLane${i + 1}Pilot${p}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedDetailItems[i];
    }
  }
}


//-------------------Fix Initial Task Items (for Pilot Details)---------------------------

export let fixedTaskItems = [];

export function updateArrayFixTask(numberOfFixTask, numberOfPilots) {
  fixedTaskItems = [];
    const saved = localStorage.getItem("fixedTaskItems");
    if (saved) {
      try {
        fixedTaskItems = JSON.parse(saved);
      } catch (e) {
        console.warn("Fehler beim Parsen von fixedTaskItems aus localStorage", e);
        fixedTaskItems = [];
      }
    }
  
  for (let i = 0; i < numberOfFixTask; i++) {
    const cell = document.getElementById(`fixedInitialTaskItem${i}`);
    const value = saved ? fixedTaskItems[i] : cell.textContent.trim();
    fixedTaskItems[i] = value;
    cell.textContent = value;

    // Event nur einmal hinzufügen
    if (!cell.dataset.listenerAdded) {
      cell.addEventListener("input", () => {
        fixedTaskItems[i] = cell.textContent.trim();
        localStorage.setItem("fixedTaskItems", JSON.stringify(fixedTaskItems));
        for (let p = 1; p <= numberOfPilots; p++) {
        insertFixedTaskItems(p);
        }
        console.log("Fix Task Array aktualisiert:", fixedTaskItems);
      });
      cell.dataset.listenerAdded = "true";
    }
  }
  for (let p = 1; p <= numberOfPilots; p++) {
    insertFixedTaskItems(p);
  }
}

export function insertFixedTaskItems(p) {
  for (let i = 0; i < fixedTaskItems.length; i++) {
    const cellId = `itemCompanyLane${i + 1}Pilot${p}`;
    const cell = document.getElementById(cellId);
    if (cell) {
      cell.textContent = fixedTaskItems[i];
    }
  }
}

