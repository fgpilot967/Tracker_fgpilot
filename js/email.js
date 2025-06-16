
// email.js

// import { pilotNames } from "./arrays";




export function sendEmail(diffDays, licenseName, pilotNames, checkboxId, notifyEmailPilots) {
  const recipient = `${notifyEmailPilots}`;
  const ccRecipient = 'xxx@abc.com, xyz@abc.com';

  const subject = `Automated Email - ${licenseName}`;
  const body = `Hello ${pilotNames}.\n\n Your ${licenseName} is going to expire. ${diffDays} days left.\n\n Please contact xxx.\n\n`;

  const mailtoLink = `mailto:${recipient}?cc=${encodeURIComponent(ccRecipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  const checkbox = document.getElementById(checkboxId);
  if (checkbox) checkbox.checked = true;

}



