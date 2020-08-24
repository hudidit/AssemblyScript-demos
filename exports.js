import { wasmBrowserInstantiate } from './demo.js';

const runWasm = async () => {
  const module = await wasmBrowserInstantiate('build/untouched.wasm');

  const exports = module.instance.exports;

  console.log('exports', exports);

  console.log('callAddFromJS', exports.callAddFromJS(10, 20));

  console.log('GET_CONST_FROM_JS', exports.GET_CONST_FROM_JS.valueOf());

  console.log('not exported', exports.addNumberWithConst);
};

runWasm();