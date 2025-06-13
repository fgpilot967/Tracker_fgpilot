

console.log("ui.js geladen");

// ui.js


export function openTab(evt, tabName) {
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

  if (tabName.startsWith("pilot")) {
    const pilotNumber = parseInt(tabName.replace("pilot", ""));
    for (let i = 1; i <= 10; i++) { // ggf. später dynamisch
      const wrapper = document.getElementById(`pilotWrapper${i}`);
      if (wrapper) wrapper.style.display = "none";
    }
    const active = document.getElementById(`pilotWrapper${pilotNumber}`);
    if (active) active.style.display = "block";
  }
}

export function updatePilotDropdownFromTable(numberOfPilots = 10) {
  const pilotDropdown = document.getElementById("pilotDropdown");
  pilotDropdown.innerHTML = "";

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




