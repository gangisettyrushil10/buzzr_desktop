export const playBuzzSound = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Create oscillator for the "buzz/tick"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Use a square wave for that 8-bit, retro, pixelated feel
    osc.type = 'square';
    
    // Start at mid frequency and drop rapidly (a "tick" or "thock" sound)
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    // Add some noise-like texture by rapidly dropping frequency
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    
    // Envelope: quick attack, quick decay
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01); // Keep volume low
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Silently ignore if audio context is blocked by browser interaction policies
    console.debug('Audio playback blocked pending user interaction');
  }
};
