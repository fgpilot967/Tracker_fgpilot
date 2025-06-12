

// calculation.js

function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

import { sendEmail } from './email.js';

export function calculateRow(pilotNumber, rowNumber) {
  const dateInput = document.getElementById(`lastCheckLiLane${rowNumber}Pilot${pilotNumber}`);
  const validityCell = document.getElementById(`validityLiLane${rowNumber}Pilot${pilotNumber}`);
  const expiryCell = document.getElementById(`newExpiryDateLiLane${rowNumber}Pilot${pilotNumber}`);
  const remDaysCell = document.getElementById(`remDaysLiLane${rowNumber}Pilot${pilotNumber}`);

  if (!dateInput || !validityCell || !expiryCell || !remDaysCell) return;

  const lastCheck = new Date(dateInput.value);
  const validity = parseInt(validityCell.textContent.replace(/\D/g, ""));

  if (isNaN(validity) || isNaN(lastCheck.getTime())) return;

  const expiryDate = new Date(lastCheck);
  expiryDate.setMonth(expiryDate.getMonth() + validity);

  expiryCell.textContent = formatDate(expiryDate); // 👈 HIER eingesetzt

  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
  remDaysCell.textContent = diffDays;


  
    // innerhalb von calculateRow():
  const licenseCell = document.querySelector(`#editableTablePilot${pilotNumber} tr:nth-child(${rowNumber + 2}) td:nth-child(1)`);
  const licenseName = licenseCell ? licenseCell.textContent.trim() : "your license";

  // IDs der Checkboxen
  const cb30 = `emailSent30LiLane${rowNumber}Pilot${pilotNumber}`;
  const cb60 = `emailSent60LiLane${rowNumber}Pilot${pilotNumber}`;
  const cb90 = `emailSent90LiLane${rowNumber}Pilot${pilotNumber}`;

  // 📬 Automatisch senden
  if (diffDays <= 30 && !document.getElementById(cb30)?.checked) {
    sendEmail(30, licenseName, pilotNumber, cb30);
  } else if (diffDays <= 60 && !document.getElementById(cb60)?.checked) {
    sendEmail(60, licenseName, pilotNumber, cb60);
  } else if (diffDays <= 90 && !document.getElementById(cb90)?.checked) {
    sendEmail(90, licenseName, pilotNumber, cb90);
  }

}

export function updatePilotTable(pilotNumber, numberOfRowsPilots) {
  for (let row = 1; row <= numberOfRowsPilots; row++) {
    calculateRow(pilotNumber, row);
  }
}

export function updateAllPilots(numberOfPilots, numberOfRowsPilots) {
  for (let pilot = 1; pilot <= numberOfPilots; pilot++) {
    updatePilotTable(pilot, numberOfRowsPilots);
  }
}


