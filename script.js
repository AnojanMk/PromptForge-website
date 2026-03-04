/* ========== PROMPTFORGE - COMPLETE JAVASCRIPT ========== */
/* FILE: script.js */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded - script running");

  // ========== GET DOM ELEMENTS ==========
  const letterSelect = document.getElementById("letterTypeSelect");
  const toneInput = document.getElementById("toneInput");
  const generateBtn = document.getElementById("generateLetterPromptBtn");
  const promptOutputDiv = document.getElementById("promptOutput");
  const promptText = document.getElementById("promptText");
  const copyBtn = document.getElementById("copyPromptBtn");

  // ========== LETTER PROMPT GENERATOR ==========
  if (generateBtn) {
    function generateLetterPrompt() {
      const type = letterSelect.value;
      let tone = toneInput.value.trim();

      let base = "";
      switch (type) {
        case "cover":
          base = "Write a cover letter for a [job title] position at [company name].";
          break;
        case "recommendation":
          base = "Write a letter of recommendation for [person name] highlighting [skills/achievements].";
          break;
        case "resignation":
          base = "Write a professional resignation letter for [job title] at [company name] with notice period [X weeks].";
          break;
        case "complaint":
          base = "Write a formal complaint letter about [issue] addressed to [recipient/organization].";
          break;
        case "personal":
          base = "Write a personal letter to [recipient] about [topic/message].";
          break;
        default:
          base = "Write a letter.";
      }

      if (tone !== "") {
        if (!tone.toLowerCase().includes("tone")) {
          tone = `Use a ${tone} tone. `;
        } else {
          tone = tone + " ";
        }
      } else {
        tone = "";
      }

      let fullPrompt = `You are an expert letter writer. ${tone}${base} Include placeholders in brackets. Make it specific, clear, and ready to use.`;

      if (type === "cover" || type === "recommendation") {
        fullPrompt += " Emphasise strengths and tailor to the context.";
      }
      if (type === "complaint") {
        fullPrompt += " Be firm but polite, and suggest a resolution.";
      }

      return fullPrompt;
    }

    function displayPrompt() {
      const prompt = generateLetterPrompt();
      promptText.innerText = prompt;
      promptOutputDiv.style.display = "block";
    }

    generateBtn.addEventListener("click", displayPrompt);
    console.log("Generate button event listener added");
  }

  // ========== COPY BUTTON ==========
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const textToCopy = promptText.innerText;
      if (textToCopy && textToCopy !== "Click generate to see a ready‑to‑use prompt") {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check me-1"></i>copied!';
            setTimeout(() => {
              copyBtn.innerHTML = originalText;
            }, 2000);
          })
          .catch((err) => {
            alert("Press Ctrl+C to copy the text");
          });
      } else {
        alert("Generate a prompt first!");
      }
    });
  }
});
