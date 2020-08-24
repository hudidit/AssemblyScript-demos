// The entry file of your WebAssembly module.

/**
 * This exports an add function.
 * It takes in two 32-bit integer values
 * And returns a 32-bit integer value.
 * @param a i32
 * @param b i32
 */
export function add(a: i32, b: i32): i32 {
  return a + b;
}

// Set up our memory
// By growing our Wasm Memory by 1 page (64KB)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory#Examples
memory.grow(1);

// Store the value 24 at index 0
const index = 0;
const value = 24;
store<u8>(index, value);

// Export a function that will read wasm memory
// and return the value at index 1
export function readWasmMemoryAtIndex(i: i32): i32 {
  let valueAtIndex = load<u8>(i);
  return valueAtIndex;
}

// Declared `importObject` function
declare function consoleLog(arg0: i32): void;

// Log out the number 24
consoleLog(24);