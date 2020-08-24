export const wasmBrowserInstantiate = async(wasmModuleUrl, importObject) => {
  let response;

  const defaultImportObject = {
    env: {
      abort: () => console.log('Abort.')
    }
  };

  if (!importObject) {
    importObject = defaultImportObject;
  } else {
    importObject = Object.assign({}, defaultImportObject, importObject);
  }

  // Notice: WebAssembly.instantiateStreaming does not work on macOS.
  // if (WebAssembly.instantiateStreaming) {
  //   response = await WebAssembly.instantiateStreaming(
  //     fetch(wasmModuleUrl),
  //     importObject
  //   );
  // } else {
    const bufferSource = await fetch(wasmModuleUrl).then(res => res.arrayBuffer());
    response = await WebAssembly.instantiate(bufferSource, importObject);
  // }
  return response;
};

export const instantiate = async () => {
  const wasmModule = await wasmBrowserInstantiate('build/untouched.wasm', {
    // Note: for Assemblyscript version 0.7.0, declared imports need to be wrapped in the index property of the importObject
    index: {
      consoleLog: value => console.log('called from WASM', value)
    },
  });
  console.log('WASM module', wasmModule);
  return wasmModule;
};