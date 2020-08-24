import { instantiate } from './common.js';

const runWasm = async () => {
  const wasmModule = await instantiate();

  const exports = wasmModule.instance.exports;

  const memory = exports.memory;

  const wasmMemArray = new Uint8Array(memory.buffer);

  const canvas = document.querySelector('canvas');

  const ctx = canvas.getContext('2d');

  const imgData = ctx.createImageData(
    canvas.width,
    canvas.height
  );

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawBoard = () => {
    const boardSize = 20;

    const getDarkValue = () => Math.floor(Math.random() * 100);

    const getLightValue = () => Math.floor(Math.random() * 127) + 127;

    // Generate a new checkboard in wasm
    exports.generateCheckerBoard(
      getDarkValue(),
      getDarkValue(),
      getDarkValue(),
      getLightValue(),
      getLightValue(),
      getLightValue()
    );

    // Pull out the RGBA values from Wasm memory, the we wrote to in wasm,
    // starting at the checkerboard pointer (memory array index)
    const imgDataArray = wasmMemArray.slice(
      exports.CHECKERBOARD_BUFFER_POINTER.valueOf(),
      exports.CHECKERBOARD_BUFFER_SIZE.valueOf()
    );

    // Set the values to the canvas image data
    imgData.data.set(imgDataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Place the new generated checkerboard onto the canvas
    ctx.putImageData(imgData, 0, 0);
  };

  drawBoard();
  setInterval(drawBoard, 1000);
  // const start = Date.now();
  // for (let i = 0; i < 1000; i++) {
  //   drawBoard();
  // }
  // console.log('time cost', Date.now() - start);
};

runWasm();