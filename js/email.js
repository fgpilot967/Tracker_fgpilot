
// email.js





export function sendEmail(diffDays, licenseName, pilotNames, checkboxId, notifyEmailPilots, adminTableArray) {
  const recipient = `${notifyEmailPilots}`;
  const ccRecipient = `${adminTableArray[2]} xyz@abc.com`;

  const subject = `Notification Email - ${licenseName}`;
  const body = `Hello ${pilotNames}.\n\n Your ${licenseName} is going to expire. ${diffDays} days left.\n\n Please contact ${adminTableArray[0]}, ${adminTableArray[1]}.\n\n`;

  const mailtoLink = `mailto:${recipient}?cc=${encodeURIComponent(ccRecipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  const checkbox = document.getElementById(checkboxId);
  if (checkbox) checkbox.checked = true;

}



