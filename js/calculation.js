
console.log("calculation.js geladen");
// calculation.js

import { sendEmail } from './email.js';
import { notifyEmailPilots, pilotNames } from './arrays.js';

function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}


//---------------Tabellen Kalkulation-----

export function calculateRow(pilotNumber, rowNumber) {
  const dateInput = document.getElementById(`lastCheckLiLane${rowNumber}Pilot${pilotNumber}`);
  const validityCell = document.getElementById(`validityLiLane${rowNumber}Pilot${pilotNumber}`);
  const expiryCell = document.getElementById(`newExpiryDateLiLane${rowNumber}Pilot${pilotNumber}`);
  const remDaysCell = document.getElementById(`remDaysLiLane${rowNumber}Pilot${pilotNumber}`);

  //------ Prüfung ob die Zellen zur Berechnung beschrieben sind. Falls nicht wird die Berechnung gelöscht--------
  const inputDate = dateInput.value.trim();
  const cellValidity = validityCell.textContent.trim();
    if (!inputDate || !cellValidity) {
      expiryCell.textContent = "";
      remDaysCell.textContent = "";
      return;
    }

  if (!dateInput || !validityCell || !expiryCell || !remDaysCell) return; //---Falls kein Eintrag, dann keine Berechnung-----

  const lastCheck = new Date(dateInput.value);
  const validity = parseInt(validityCell.textContent.replace(/\D/g, ""));

  if (isNaN(validity) || isNaN(lastCheck.getTime())) return;

  const expiryDate = new Date(lastCheck);
  expiryDate.setMonth(expiryDate.getMonth() + validity);

  expiryCell.textContent = formatDate(expiryDate);

  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  remDaysCell.textContent = diffDays;

  remDaysCell.style.backgroundColor =
    diffDays <= 0 ? "lightcoral" : diffDays <= 60 ? "yellow" : diffDays <= 90 ? "lightyellow" : "rgb(168, 185, 170)";

  
    // innerhalb von calculateRow():
  const licenseCell = document.querySelector(`#editableTablePilot${pilotNumber} tr:nth-child(${rowNumber + 1}) td:nth-child(1)`);
  const licenseName = licenseCell ? licenseCell.textContent.trim() : "your license";


  // IDs der Checkboxen
  const cb30 = `emailSent30LiLane${rowNumber}Pilot${pilotNumber}`;
  const cb60 = `emailSent60LiLane${rowNumber}Pilot${pilotNumber}`;
  const cb90 = `emailSent90LiLane${rowNumber}Pilot${pilotNumber}`;

  // 📬 Automatisch senden
  if (diffDays <= 30 && !document.getElementById(cb30)?.checked) {
    sendEmail(diffDays, licenseName, pilotNames[(pilotNumber-1)], cb30, notifyEmailPilots[(pilotNumber-1)]);
  }
  if (diffDays <= 60 && !document.getElementById(cb60)?.checked) {
    sendEmail(diffDays, licenseName, pilotNames[(pilotNumber-1)], cb60, notifyEmailPilots[(pilotNumber-1)]);
  }
  if (diffDays <= 90 && !document.getElementById(cb90)?.checked) {
    sendEmail(diffDays, licenseName, pilotNames[(pilotNumber-1)], cb90, notifyEmailPilots[(pilotNumber-1)]);
  }
}


export function updateAllPilots(numberOfPilots, numberOfRowsPilots) {
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    updatePilotTable(pilot, numberOfRowsPilots);
  }
}


export function updatePilotTable(pilotNumber, numberOfRowsPilots) {
  for (let row = 1; row <= numberOfRowsPilots; row++) {
    calculateRow(pilotNumber, row);
  }
}





