const yesNoApi = "https://yesno.wtf/api";

const answers = { yes: "Sim", no: "Não", maybe: "Talvez" };

async function sendMessage(event) {
  event.preventDefault();

  const message = messageInput.value;
  messageInput.value = "";

  renderTextMessage(message, "me");

  if (message.includes("?")) {
    const response = await (await fetch(yesNoApi)).json();

    renderTextMessage(answers[response.answer], "you");
    renderImageMessage(response.image, "you");
  } else {
    renderTextMessage("Faça uma PERGUNTA", "you");
  }
}

function renderTextMessage(message, sender) {
  chat.innerHTML += `
    <div class="message ${sender}">
      <p>${message}</p>
    </div>
  `;
}

function renderImageMessage(image, sender) {
  chat.innerHTML += `
    <div class="message ${sender}">
      <img src="${image}"/>
    </div>
  `;
}

function setup() {
  document
    .getElementById("messageForm")
    .addEventListener("submit", sendMessage);

  renderTextMessage("Faça uma pergunta", "you");
}

setup();
