/* JS Code, der nur auf mehreren Pages verwendet wird */

const form = document.querySelector("form");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const tel = document.getElementById("tel");
  const text = document.getElementById("text");
  const nameValue = name.value.trim();
  const telValue = tel.value.trim();
  const emailValue = email.value.trim();

  function displayError(inputField, message) {
    const errorDisplay = inputField.nextElementSibling;
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";
  }

  document
    .querySelectorAll(".error")
    .forEach((e) => (e.style.display = "none"));

  if (nameValue === "") {
    displayError(name, "Bitte geben Sie Ihren vollständigen Namen ein.");
    return;
  }
  if (!emailValue.includes("@")) {
    displayError(email, "Bitte geben Sie eine gültige E-Mail-Adresse ein.");
    return;
  }
  if (telValue === "") {
    displayError(tel, "Bitte geben Sie Ihre Telefonnummer ein.");
    return;
  }

  spinner.style.display = "block";

  sendToDatabase(nameValue, emailValue, telValue, text);
});

const sendToDatabase = async (nameValue, emailValue, telValue, text) => {
  await databaseClient.insertInto("user", {
    email: emailValue,
    name: nameValue,
    tel: telValue,
    text: text.value,
  });

  spinner.style.display = "none";

  form.submit();
};
