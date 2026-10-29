/**
 * Audio Speech Synthesis Utility for Arabic Pronunciation
 */

export function speakArabic(text: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Clean up decorative brackets or English text if present
    const cleanedText = text
      .replace(/[\(\)\[\]\{\}]/g, '')
      .replace(/[a-zA-Z]/g, '')
      .trim();

    if (!cleanedText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for clear pronunciation learning
    utterance.pitch = 1.0;

    // Try finding an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith('ar') || v.name.toLowerCase().includes('arabic'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Failed to trigger speech synthesis:', error);
    return false;
  }
}
