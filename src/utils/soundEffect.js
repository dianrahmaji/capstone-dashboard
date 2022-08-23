class SoundEffect {
  audio;

  constructor(url) {
    this.audio = new Audio(url);
  }

  play() {
    this.audio.play();
  }
}

// eslint-disable-next-line import/prefer-default-export
export const notification = new SoundEffect("/assets/audio/message.mp3");
