let speechSynthesisUtterance;
let isSpeaking = false;

export const speakText = (text) => {
    if (isSpeaking) {
        window.speechSynthesis.cancel(); // ❌ Stop current speech
        isSpeaking = false;
        return;
    }

    // ✅ Start new speech
    speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesisUtterance.onend = () => {
        isSpeaking = false;
    };
    isSpeaking = true;
    window.speechSynthesis.speak(speechSynthesisUtterance);
};
