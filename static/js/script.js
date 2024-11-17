const generateTextButton = document.getElementById("generateText");
const queryInput = document.getElementById("queryInput");
const generatedTextElement = document.getElementById("generatedText");

let generatedText = "";
let typedText = "";

// Função para chamar a API
async function fetchStory(query) {
  try {
    const response = await fetch("http://127.0.0.1:5000/qna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log(data);
    return data.answer;
  } catch (error) {
    console.error("Erro ao buscar a história:", error);
    return "Erro ao gerar a história. Tente novamente mais tarde.";
  }
}

// Renderizar texto com opacidade
function renderTextWithOpacity(text) {
  generatedTextElement.innerHTML = ""; // Limpa o texto anterior
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    generatedTextElement.appendChild(span);
  });
}

// Atualizar estilo do texto digitado
function updateTextStyles() {
  const spans = generatedTextElement.querySelectorAll("span");

  spans.forEach((span, index) => {
    const typedChar = typedText[index];
    if (typedChar === undefined) {
      span.className = ""; // Restaura opacidade inicial
    } else if (typedChar === span.textContent) {
      span.className = "correct"; // Letra correta
    } else {
      span.className = "incorrect"; // Letra incorreta
    }
  });
}

// Capturar digitação global
document.addEventListener("keydown", (event) => {
  if (!generatedText) return; // Não faz nada se o texto não foi gerado

  // Ignorar teclas especiais como Backspace e Enter
  if (event.key === "Backspace") {
    typedText = typedText.slice(0, -1);
  } else if (event.key.length === 1) {
    typedText += event.key;
  }

  updateTextStyles();
});

// Enviar tema ao pressionar Enter
queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Impede o comportamento padrão do Enter
    generateTextButton.click(); // Simula o clique no botão "Gerar Texto"
  }
});

// Gerar texto ao clicar no botão
generateTextButton.addEventListener("click", async () => {
  const query = queryInput.value.trim();
  if (!query) {
    alert("Por favor, digite um tema para a história.");
    return;
  }

  generatedTextElement.textContent = "Gerando texto...";
  generatedText = ""; // Reseta o texto gerado
  typedText = ""; // Reseta o texto digitado

  generatedText = await fetchStory(query);

  if (generatedText) {
    renderTextWithOpacity(generatedText);
  } else {
    generatedTextElement.textContent = "Erro ao gerar o texto.";
  }
});
