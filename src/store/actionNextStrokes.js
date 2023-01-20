import {texts} from "../assets/TextsToType";
import {ACUTE, DIAERESIS, SPACE} from "../assets/Variables";
import {keyboardActions} from "./index";
import {strokes} from "../assets/Strokes";
import {altNonLetterKeys, keyboard_greek_to_latin} from "../assets/KeyboardGrMap";
export const nextStrokes = (newInputText, textIndex, state) =>
{
    state.shouldBeClicked = strokes
    const index = newInputText.length
    const exemplar = texts[textIndex]
    if (index >= exemplar.length) {
        return null
    }

    let awaitedChar = exemplar[index]
    const unicodeChar = awaitedChar.normalize("NFD");

    if (unicodeChar.length > 1) {
        combinedCharAwaited(unicodeChar, state)
    } else {
        singleCharAwaited(unicodeChar)
    }
}


const combinedCharAwaited = (unicodeChar, state) => {


    state.nextToBeClickedComposing = unicodeChar.replace(ACUTE, "").replace(DIAERESIS, "").normalize('NFD')
    if (unicodeChar.includes(ACUTE) && unicodeChar.includes(DIAERESIS)) {
        state.shouldBeClicked['keyW'] = true
        state.shouldShift = true


    } else if (unicodeChar.includes(ACUTE)) {
        state.shouldBeClicked['Semicolon'] = true
    } else if (unicodeChar.includes(DIAERESIS)) {
        state.shouldBeClicked['Semicolon'] = true
        state.shouldShift = true
    }
}

const singleCharAwaited = (unicodeChar, state) => {
    if (unicodeChar === " ") {
        state.shouldBeClicked[SPACE] = true
    }
    else if (unicodeChar.toLowerCase() in keyboard_greek_to_latin) {
        state.shouldBeClicked[keyboard_greek_to_latin[unicodeChar.toLowerCase()]] = true
        if (!(unicodeChar in keyboard_greek_to_latin)) {
            state.shouldShift = true
        }
        else if (unicodeChar in altNonLetterKeys) {
            state.shouldShift = true
            state.shouldBeClicked[altNonLetterKeys[unicodeChar][0]] = true
        }
    }

}