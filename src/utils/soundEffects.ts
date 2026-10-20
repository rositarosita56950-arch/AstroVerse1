// Web Audio API ambient cosmic sound synthesizer without external audio files

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play gentle celestial chime on card flip or tab switch
  public playChime(pitch: 'high' | 'mid' | 'low' = 'mid') {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqMap = {
        high: 880, // A5
        mid: 528,  // Miracle frequency 528Hz
        low: 432,  // Harmonic 432Hz
      };

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqMap[pitch], this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqMap[pitch] * 1.5, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Play starry achievement sparkle
  public playCelebration() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [528, 660, 792, 1056];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.07, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.55);
      });
    } catch {
      // Audio policy safe
    }
  }

  // Toggle ambient 432Hz deep space drone
  public toggleAmbientMusic(): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      }
      setTimeout(() => {
        this.ambientOsc?.stop();
        this.ambientOsc?.disconnect();
        this.ambientOsc = null;
        this.ambientGain = null;
      }, 1000);
      this.isAmbientPlaying = false;
      return false;
    } else {
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      this.ambientOsc.type = 'sine';
      this.ambientOsc.frequency.setValueAtTime(216, this.ctx.currentTime); // 432/2 deep harmonic

      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 2);

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc.start();
      this.isAmbientPlaying = true;
      return true;
    }
  }

  public getAmbientStatus(): boolean {
    return this.isAmbientPlaying;
  }
}

export const cosmicAudio = new CosmicAudioEngine();
