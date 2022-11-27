import { BaseDirectory, readBinaryFile } from '@tauri-apps/api/fs';
import { Ref, ref } from 'vue';

type Music = {
  name: string;
  path: string; // relative path base on BaseDirectory.App
};

const hook = (list: Ref<Music[]>) => {
  const status = ref<'unready' | 'play' | 'pause'>('unready');

  const active = ref<Music | undefined>(undefined);

  const ctx: AudioContext = new window.AudioContext();
  const source: AudioBufferSourceNode = ctx.createBufferSource();

  source.addEventListener('ended', () => {
    console.warn('end');
  });

  async function doPlay(): Promise<void> {
    if (active.value === undefined) {
      return;
    }
    loadU8a(active.value.path)
      .then((u8a: Uint8Array) => {
        return ctx.decodeAudioData(u8a.buffer);
      })
      .then((buffer) => {
        source.stop();
        source.buffer = null;
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      });
  }

  function play() {
    const length = list.value.length;
    if (length === 0) {
      return;
    }
    active.value = list.value[0];
    doPlay();
  }

  function pause() {
    source.stop();
  }

  function next() {
    if (active.value === undefined || list.value.length === 0) {
      return;
    }
    const i = list.value.findIndex((x) => x.path === active.value.path);
    active.value = list.value[i + 1];
    doPlay();
  }

  function preview() {
    if (active.value === undefined || list.value.length === 0) {
      return;
    }
    const i = list.value.findIndex((x) => x.path === active.value.path);
    active.value = list.value[i - 1];
    doPlay();
  }

  function random() {
    const length = list.value.length;
    if (length === 0) {
      return;
    }
    active.value = list.value[Math.floor(Math.random() * length)];
    doPlay();
  }

  return { status, play, pause, next, preview, random };
};

async function loadU8a(path: string): Promise<Uint8Array> {
  return readBinaryFile(path, { dir: BaseDirectory.App });
}

export default hook;
export { Music };
