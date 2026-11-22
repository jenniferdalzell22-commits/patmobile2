/**
 * Gentle Web Audio sound effects for the memorial website:
 * - Soft meditation chime when lighting a candle
 * - Pleasant bell chime when correctly guessing Mom's mystery recipe
 * - Subtle page-turn rustle
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCandleChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Layered harmonic singing bowl / soft chime
    const freqs = [528, 660, 792]; // Solfeggio / warm harmonic frequencies

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.001, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.05 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 2.6);
    });
  } catch {
    // Ignore audio permission errors
  }
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // 3 uplifting ascending notes: C5, E5, G5
    const notes = [523.25, 659.25, 783.99];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0.001, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.09, now + i * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 1.3);
    });
  } catch {
    // Ignore audio permission errors
  }
}
