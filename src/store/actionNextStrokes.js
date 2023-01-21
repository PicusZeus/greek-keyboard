import { texts } from "../assets/TextsToType";
import { ACUTE, DIAERESIS, SPACE } from "../assets/Variables";
import { keyboardActions } from "./index";
import { strokes } from "../assets/Strokes";
import {
  altGreekKeys,
  altKeys, keyboard_eng_map_vow,
  keyboard_greek_to_latin,
  nonLetterKeys,
  nonLetterKeysGreek,
} from "../assets/KeyboardGrMap";
let counter = 1
export const nextStrokes = (newInputText, textIndex, language, nextTBCC) => {

  const shouldBeClicked = { ...strokes };

  let shouldShift = false;
  let nextToBeClickedComposing = nextTBCC;
  const index = newInputText.length;
  const exemplar = texts[textIndex];
  if (index >= exemplar.length) {
    return [shouldBeClicked, shouldShift, nextToBeClickedComposing];
  }

  let awaitedChar = exemplar[index];
  let unicodeChar = awaitedChar.normalize("NFD");

  if (unicodeChar.length > 1 && !nextTBCC) {
    counter ++
    console.log(counter, 'combined')
    return combinedCharAwaited(
      unicodeChar,
      shouldBeClicked,
      language,
      nextToBeClickedComposing
    );
  } else {


    counter++
    console.log(counter, 'single')
    return singleCharAwaited(
      unicodeChar,
      shouldBeClicked,
      language,
      nextToBeClickedComposing
    );
  }
};

const combinedCharAwaited = (unicodeChar, sdb, language, nextTBCC) => {
  const shouldBeClicked = { ...sdb };
  let shouldShift = false;
  let nextToBeClickedComposing = nextTBCC;

  if (language === "gr") {
    nextToBeClickedComposing = unicodeChar
      .replace(ACUTE, "")
      .replace(DIAERESIS, "")
      .normalize("NFD");

  }


  if (unicodeChar.includes(ACUTE) && unicodeChar.includes(DIAERESIS)) {
    shouldBeClicked["keyW"] = true;
    shouldShift = true;
  } else if (unicodeChar.includes(ACUTE)) {
    shouldBeClicked["Semicolon"] = true;
  } else if (unicodeChar.includes(DIAERESIS)) {
    shouldBeClicked["Semicolon"] = true;
    shouldShift = true;
  }
  return [shouldBeClicked, shouldShift, nextToBeClickedComposing];
};

const singleCharAwaited = (
  unicodeChar,
  sdb,
  language,
  nextToBeClickedComposing
) => {
  const shouldBeClicked = { ...sdb };
  let shouldShift = false;
  if (nextToBeClickedComposing) {
    if (nextToBeClickedComposing in keyboard_greek_to_latin) {
      nextToBeClickedComposing = keyboard_greek_to_latin[nextToBeClickedComposing]
    } else {
      nextToBeClickedComposing = keyboard_greek_to_latin[nextToBeClickedComposing.toLowerCase()]
      shouldShift = true
    }
    shouldBeClicked[nextToBeClickedComposing] = true;
  } else if (unicodeChar === " ") {
    shouldBeClicked[SPACE] = true;
  } else if (unicodeChar.toLowerCase() in keyboard_greek_to_latin) {
    shouldBeClicked[keyboard_greek_to_latin[unicodeChar.toLowerCase()]] = true;
    if (!(unicodeChar in keyboard_greek_to_latin)) {
      shouldShift = true;
    }
  } else if (language === "gr" && unicodeChar in altGreekKeys) {
    shouldShift = true;
    shouldBeClicked[altGreekKeys[unicodeChar][0]] = true;
    shouldBeClicked[altGreekKeys[unicodeChar][1]] = true;
  } else if (unicodeChar in altKeys) {
    shouldBeClicked[altKeys[unicodeChar][1]] = true;
    shouldBeClicked[altKeys[unicodeChar][0]] = true;
  } else if (unicodeChar in nonLetterKeysGreek && language === "gr") {
    shouldBeClicked[nonLetterKeysGreek[unicodeChar]] = true;
  } else if (unicodeChar in nonLetterKeys) {
    shouldBeClicked[nonLetterKeys[unicodeChar]] = true;
  }

  return [shouldBeClicked, shouldShift, null];
};
