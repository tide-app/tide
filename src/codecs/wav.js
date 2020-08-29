const { min } = Math;
const { max } = Math;

const setString = (view, offset, str) => {
  const len = str.length;
  for (let i = 0; i < len; i += 1) view.setUint8(offset + i, str.charCodeAt(i));
};

export default class WavEncoder {
  constructor(sampleRate = 44100, numChannels = 2) {
    this.sampleRate = sampleRate;
    this.numChannels = numChannels;
    this.numSamples = 0;
    this.dataViews = [];
  }

  encode(buffer) {
    const len = buffer[0].length;
    const nCh = this.numChannels;
    const view = new DataView(new ArrayBuffer(len * nCh * 2));
    let offset = 0;
    for (let i = 0; i < len; i += 1)
      for (let ch = 0; ch < nCh; ch += 1) {
        const x = buffer[ch][i] * 0x7fff;
        view.setInt16(offset, x < 0 ? max(x, -0x8000) : min(x, 0x7fff), true);
        offset += 2;
      }
    this.dataViews.push(view);
    this.numSamples += len;
  }

  finish(mimeType = "audio/wav") {
    const dataSize = this.numChannels * this.numSamples * 2;
    const view = new DataView(new ArrayBuffer(44));
    setString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    setString(view, 8, "WAVE");
    setString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, this.numChannels, true);
    view.setUint32(24, this.sampleRate, true);
    view.setUint32(28, this.sampleRate * 4, true);
    view.setUint16(32, this.numChannels * 2, true);
    view.setUint16(34, 16, true);
    setString(view, 36, "data");
    view.setUint32(40, dataSize, true);
    this.dataViews.unshift(view);
    const blob = new Blob(this.dataViews, { type: mimeType });
    this.cleanup();
    return blob;
  }

  cancel() {
    this.cleanup();
  }

  cleanup() {
    delete this.dataViews;
  }
}
