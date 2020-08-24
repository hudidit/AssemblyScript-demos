
const ADD_CONST: i32 = 100;

function addNumberWithConst(a: i32, b: i32): i32 {
  return a + b + ADD_CONST;
}

export const GET_CONST_FROM_JS = 666;

export function callAddFromJS(a: i32, b: i32): i32 {
  return addNumberWithConst(a, b);
}