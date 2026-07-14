export function playAnalyzeSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.18);
    
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    // silent fail
  }
}

export function playSuccessSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(660, ctx.currentTime + 0.08);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.16);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {}
}

export function triggerHaptic() {
  if (navigator.vibrate) {
    navigator.vibrate([30, 20, 40]);
  }
}