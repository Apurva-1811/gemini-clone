const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const startListening = (onResult, onEnd) => {
  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    onResult(speechResult);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();
};
