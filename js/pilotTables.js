
console.log("pilotTables.js geladen");

// pilotTables.js


//--------------------Piloten Tabellen--------------------

export function createPilotTable(pilotNumber, numberOfRowsPilots) {
  const table = document.createElement('table');
  table.id = `editableTablePilot${pilotNumber}`;

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

  for (let i = 1; i <= numberOfRowsPilots; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td contenteditable="true" class="green"></td>
      <td><input type="date" class="inputDate" id="lastCheckLiLane${i}Pilot${pilotNumber}"></td>
      <td contenteditable="true" class="inputValidity" id="validityLiLane${i}Pilot${pilotNumber}"></td>
      <td id="newExpiryDateLiLane${i}Pilot${pilotNumber}"></td>
      <td id="remDaysLiLane${i}Pilot${pilotNumber}"></td>
      <td><input type="checkbox" id="emailSent30LiLane${i}Pilot${pilotNumber}">30</td>
      <td><input type="checkbox" id="emailSent60LiLane${i}Pilot${pilotNumber}">60</td>
      <td><input type="checkbox" id="emailSent90LiLane${i}Pilot${pilotNumber}">90</td>
      <td><input type="date" class="inputDate" id="newEventLiLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }

  return table;
}


//--------------------Detail Tabelle---------------

export function createPilotDetailTable(pilotNumber, numberOfRowsDetail, numberOfFixItems) {
  const table = document.createElement('table');
  table.id = `detailTablePilot${pilotNumber}`;

  table.innerHTML = `
    <tr>
      <th class="headTable">Info-Item</th>
      <th class="headTable">Detail</th>
    </tr>
  `;

  for (let i = 1; i <= numberOfRowsDetail; i++) {
    const isFixed = i <= numberOfFixItems;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td ${isFixed ? 'class="fixItem" title="Fix Item from Setup"' : 'contenteditable="true"'} class="detailTable" id="itemDetailLane${i}Pilot${pilotNumber}"></td>
      <td contenteditable="true" class="detailTable" id="inputDetailLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }

  return table;
}


//-------------------Initial-Task-Tabelle-----------------------

export function createPilotCompanyTable(pilotNumber, numberOfRowsTask, numberOfFixTask) {
  const table = document.createElement('table');
  table.id = `detailCompanyPilot${pilotNumber}`;

  table.innerHTML = `
    <tr>
      <th class="headTable">Initial-Task-Item</th>
      <th class="headTable">Date</th>
      <th class="headTable">Passed</th>
    </tr>
  `;

  for (let i = 1; i <= numberOfRowsTask; i++) {
    const isFixed = i <= numberOfFixTask;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td ${isFixed ? 'class="fixItem" title="Fix Task from Setup"' : 'contenteditable="true"'} class="detailTable" id="itemCompanyLane${i}Pilot${pilotNumber}"></td>
      <td><input type="date" class="inputDate" id="dateCompanyLane${i}Pilot${pilotNumber}"></td>
      <td><input type="checkbox" value="passed" id="itemCompanyPassedLane${i}Pilot${pilotNumber}"></td>
    `;
    table.appendChild(row);
  }

  return table;
}


