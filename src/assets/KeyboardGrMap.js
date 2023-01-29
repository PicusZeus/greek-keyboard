import { ACUTE, DIAERESIS } from "./Variables";

export const greekCharMap = {
  KeyQ: "Semicolon",
  KeyW: "ς",
  KeyE: "ε",
  KeyR: "ρ",
  KeyT: "τ",
  KeyY: "υ",
  KeyU: "θ",
  KeyI: "ι",
  KeyO: "ο",
  KeyP: "π",
  KeyA: "α",
  KeyS: "σ",
  KeyD: "δ",
  KeyF: "φ",
  KeyG: "γ",
  KeyH: "η",
  KeyJ: "ξ",
  KeyK: "κ",
  KeyL: "λ",
  Quote: "Colon",
  Semicolon: "Acute",
  KeyZ: "ζ",
  KeyX: "χ",
  KeyC: "ψ",
  KeyV: "ω",
  KeyB: "β",
  KeyN: "ν",
  KeyM: "μ",
};

export const keyboard_gr_map = {
  Backspace: ["Backspace"],

  Tab: ["Tab"],

  ";": ["q"],
  ς: ["w"],
  ε: ["e"],
  ρ: ["r"],
  τ: ["t"],
  υ: ["y"],
  θ: ["u"],
  ι: ["i"],
  ο: ["o"],
  π: ["p"],

  CapsLock: ["CapsLock"],
  α: ["a"],
  σ: ["s"],
  δ: ["d"],
  φ: ["f"],
  γ: ["g"],
  η: ["h"],
  ξ: ["j"],
  κ: ["k"],
  λ: ["l"],
  Dead: ["Dead"],
  "'": ["'"],
  "[": ["["],

  "]": ["]"],

  "\\": ["\\"],

  Enter: ["Enter"],
  "`": ["`"],

  1: ["1"],

  2: ["2"],

  3: ["3"],

  4: ["4"],

  5: ["5"],

  6: ["6"],

  7: ["7"],

  8: ["8"],

  9: ["9"],

  0: ["0"],

  "-": ["-"],

  "=": ["="],

  Shift: ["Shift"],
  ζ: ["z"],
  χ: ["x"],
  ψ: ["c"],
  ω: ["v"],
  β: ["b"],
  ν: ["n"],
  μ: ["m"],
  ",": [","],

  ".": ["."],

  "/": ["/"],

  Space: ["Space"],
};

export const altGreekKeys = {
  ":": ["KeyQ", "Shift"],

};

export const altKeys = {
  "?": ["Slash", "Shift"],
  ">": ["Period", "Shift"],
  "<": ["Colon", "Shift"],
  '"': ["Quotation", "Shift"],
  "+": ["Equal", "Shift"],
  _: ["Minus", "Shift"],
  ")": ["Digit0", "Shift"],
  "(": ["Digit9", "Shift"],
  "*": ["Digit8", "Shift"],
  ":": ["Semicolon", "Shift"],
  "{": ["BracketLeft", "Shift"],
  "}": ["BracketRight", "Shift"],
  "|": ["Backslash", "Shift"],
  "~": ["Backquote", "Shift"],
  "!": ["Digit1", "Shift"],
  "@": ["Digit2", "Shift"],
  "#": ["Digit3", "Shift"],
  $: ["Digit4", "Shift"],
  "%": ["Digit5", "Shift"],
  "&": ["Digit7", "Shift"],
  "^": ["Digit6", "Shift"],
  ż: ["KeyZ", "Alt"],
  ź: ["KeyX", "Alt"],
  ć: ["KeyC", "Alt"],
  ą: ["KeyA", "Alt"],
  ę: ["KeyE", "Alt"],
  "«": ["Coma", "Alt"],
  "»": ["Period", "Alt"],
};

export const keyboard_eng_map_diacr = {
  W: [DIAERESIS + ACUTE, "΅"],
  ":": [DIAERESIS, "¨"],
  ";": [ACUTE, "΄"],
};

export const keyboard_eng_map_vow = {
  e: "ε",
  y: "υ",
  i: "ι",
  o: "ο",
  a: "α",
  h: "η",
  v: "ω",
};
export const keyboard_eng_map_cons = {
  Q: ":",
  q: ";",
  "≤": "«",
  "≥": "»",
  w: "ς",
  r: "ρ",
  t: "τ",
  u: "θ",
  p: "π",
  s: "σ",
  d: "δ",
  f: "φ",
  g: "γ",

  j: "ξ",
  k: "κ",
  l: "λ",
  z: "ζ",
  x: "χ",
  c: "ψ",

  b: "β",
  n: "ν",
  m: "μ",
};

export const keyboard_greek_to_latin = {
  ς: "KeyW",
  ε: "KeyE",
  ρ: "KeyR",
  τ: "KeyT",
  υ: "KeyY",
  θ: "KeyU",
  ι: "KeyI",
  ο: "KeyO",
  π: "KeyP",
  α: "KeyA",
  σ: "KeyS",
  δ: "KeyD",
  φ: "KeyF",
  γ: "KeyG",
  η: "KeyH",
  ξ: "KeyJ",
  κ: "KeyK",
  λ: "KeyL",
  ζ: "KeyZ",
  χ: "KeyX",
  ψ: "KeyC",
  ω: "KeyV",
  β: "KeyB",
  ν: "KeyN",
  μ: "KeyM",
};

export const keyboard_latin_to_latin = {
  w: "KeyW",
  e: "KeyE",
  r: "KeyR",
  t: "KeyT",
  y: "KeyY",
  u: "KeyU",
  i: "KeyI",
  o: "KeyO",
  p: "KeyP",
  a: "KeyA",
  s: "KeyS",
  d: "KeyD",
  f: "KeyF",
  g: "KeyG",
  h: "KeyH",
  j: "KeyJ",
  k: "KeyK",
  l: "KeyL",
  z: "KeyZ",
  x: "KeyX",
  c: "KeyC",
  v: "KeyV",
  b: "KeyB",
  n: "KeyN",
  m: "KeyM",
};

export const nonLetterKeysGreek = {
  ";": "KeyQ",
};
export const nonLetterKeys = {
  "/": "Slash",
  ".": "Period",
  ",": "Coma",
  "": "Quotation",
  "=": "Equal",
  "-": "Minus",
  0: "Digit0",
  9: "Digit9",
  8: "Digit8",
  ";": "Semicolon",
  "[": "BracketLeft",
  "]": "BracketRight",
  "\\": "Backslash",
  "`": "Backquote",
  1: "Digit1",
  2: "Digit2",
  3: "Digit3",
  4: "Digit4",
  5: "Digit5",
  7: "Digit7",
  6: "Digit6",
};
