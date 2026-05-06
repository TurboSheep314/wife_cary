const form = document.querySelector("#registration-form");
const successMessage = document.querySelector("#success-message");

const fields = {
  carrierName: document.querySelector("#carrier-name"),
  wifeName: document.querySelector("#wife-name"),
  wifeHeight: document.querySelector("#wife-height"),
  wifeWeight: document.querySelector("#wife-weight"),
};

const errors = {
  carrierName: document.querySelector("#carrier-name-error"),
  wifeName: document.querySelector("#wife-name-error"),
  wifeHeight: document.querySelector("#wife-height-error"),
  wifeWeight: document.querySelector("#wife-weight-error"),
};

const storageKey = "wifeCarryRegistrations";
const savedTeams = JSON.parse(localStorage.getItem(storageKey) || "[]");
const teams = Array.isArray(savedTeams) ? savedTeams : [];

function validateRegistration(values) {
  const messages = {};

  if (!values.carrierName) {
    messages.carrierName = "Enter your name.";
  }

  if (!values.wifeName) {
    messages.wifeName = "Enter your wife's name.";
  }

  if (!values.wifeHeight) {
    messages.wifeHeight = "Enter her height.";
  } else if (values.wifeHeight < 36 || values.wifeHeight > 96) {
    messages.wifeHeight = "Use a height from 36 to 96 inches.";
  }

  if (!values.wifeWeight) {
    messages.wifeWeight = "Enter her weight.";
  } else if (values.wifeWeight < 50 || values.wifeWeight > 500) {
    messages.wifeWeight = "Use a weight from 50 to 500 pounds.";
  }

  return messages;
}

function readFormValues() {
  return {
    carrierName: fields.carrierName.value.trim(),
    wifeName: fields.wifeName.value.trim(),
    wifeHeight: Number(fields.wifeHeight.value),
    wifeWeight: Number(fields.wifeWeight.value),
  };
}

function showErrors(messages) {
  Object.keys(errors).forEach((key) => {
    errors[key].textContent = messages[key] || "";
    fields[key].setAttribute("aria-invalid", messages[key] ? "true" : "false");
  });
}

function saveTeams() {
  localStorage.setItem(storageKey, JSON.stringify(teams));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const values = readFormValues();
  const messages = validateRegistration(values);

  showErrors(messages);

  if (Object.keys(messages).length > 0) {
    const firstInvalidField = fields[Object.keys(messages)[0]];
    firstInvalidField.focus();
    return;
  }

  teams.push(values);
  saveTeams();
  successMessage.textContent = `${values.carrierName} and ${values.wifeName} are registered.`;
  form.reset();
  fields.carrierName.focus();
});
