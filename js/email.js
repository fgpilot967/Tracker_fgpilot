
// email.js

export function sendEmail(remDays, licenseName, pilotNumber, checkboxId) {
  const recipient = `pilot${pilotNumber}@abc.com`;
  const ccRecipient = 'xxx@abc.com, xyz@abc.com';

  const subject = `Automated Email - ${licenseName}`;
  const body = `Your ${licenseName} is going to expire. ${remDays} days left. Please contact xxx.`;

  const mailtoLink = `mailto:${recipient}?cc=${encodeURIComponent(ccRecipient)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  const checkbox = document.getElementById(checkboxId);
  if (checkbox) checkbox.checked = true;
}



