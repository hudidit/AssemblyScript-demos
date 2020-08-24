import { instantiate } from './common.js';

const runWasm = async () => {
  const wasmModule = await instantiate();
  console.log('wasm module', wasmModule);
  const exports = wasmModule.instance.exports;
  const add = exports.add;
  let num = 0;
  let startTime = Date.now();
  for (let i = 0; i < 10000000; i++) {
    num = add(num, 1);
  }
  console.log(`[wasm add] num: ${num}\n It took ${Date.now() - startTime}ms.`);

  const jsAdd = (a, b) => a + b;
  num = 0;
  startTime = Date.now();
  for (let i = 0; i < 10000000; i++) {
    num = jsAdd(num, 1);
  }
  console.log(`[js add] num: ${num}\n It took ${Date.now() - startTime}ms.`);

  console.log('read wasm memory with wasm exported function:', exports.readWasmMemoryAtIndex(0));

  const memory = exports.memory;
  // Create a Uint8Array to give us access to Wasm Memory
  const wasmMemoryArray = new Uint8Array(memory.buffer);

  // Let's read index zero from JS, to make sure Wasm wrote to
  // wasm memory, and JS can read the "passed" value from Wasm
  console.log('read wasm memory with JS', wasmMemoryArray[0]);

  // Next let's write to index one, to make sure we can
  // write wasm memory, and Wasm can read the "passed" value from JS
  wasmMemoryArray[1] = 25;
  console.log('read wasm memory with wasm exported function:', exports.readWasmMemoryAtIndex(1));
};

runWasm();