/*
import { pilotNames } from "./arrays";

export function savePilotNames() {
  fetch("http://217.154.84.3:3000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: "frankie",
      data: { pilotNames }
    })
  })
  .then(res => res.text())
  .then(data => console.log("✅ Auf dem Server gespeichert:", data))
  .catch(error => console.error("❌ Fehler beim Speichern:", error));
};
*/



/*
function loadNotifyEmails(user) {
  fetch(`http://217.154.84.3/loadUserData?user=${user}&key=notifyEmailPilots`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        notifyEmailPilots = data;
        console.log("📨 Notify-Emails geladen:", data);
        // z. B. in die DOM-Zellen zurückschreiben...
      }
    })
    .catch(error => console.error("❌ Fehler beim Laden:", error));
}
*/


