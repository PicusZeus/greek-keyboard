import { createSlice, configureStore } from "@reduxjs/toolkit";
import { strokes } from "../assets/Strokes";
import { SHIFT } from "../assets/Variables";
import {nextStrokes} from "./actionNextStrokes";
const initialState = {
  inputText: "",
  language: "gr",
  clicked: { ...strokes },
  shift: false,
  capslock: false,
  shouldBeClicked: { ...strokes },
  shouldShift: false,
  shouldAcute: false,
  shouldDiaeresis: false,
  shouldDiaeresisWithAcute: false,
  nextToBeClickedComposing: false
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: initialState,
  reducers: {
    changeLanguage(state) {
      if (state.language === "gr") {
        state.language = "pl";
      } else {
        state.language = "gr";
      }
    },
    addToInputText(state, action) {
      state.inputText = state.inputText + action.payload;
    },
    updateInputText(state, action) {
      state.inputText = action.payload;
      nextStrokes(action.payload.newText, action.payload.textIndex, state)
    },
    shift(state) {
      state.shift = true;
    },
    capslockOn(state) {
      state.capslock = true;
    },
    capslockOff(state) {
      state.capslock = false;
    },
    keyClicked(state, action) {
      let key = action.payload;
      if (key.length === 1) {
        key = key.toLowerCase();
      }
      state.clicked[key] = true;
    },
    keyReleased(state, action) {
      let key = action.payload;
      if (key.length === 1) {
        key = key.toLowerCase();
      }
      state.clicked[key] = false;
    },
    capslockToggle(state) {
      state.capslock = !state.capslock;
    },
    shiftOn(state) {
      state.shift = true;
    },
    shiftOff(state) {
      state.shift = false;
      state.clicked[SHIFT] = false;
    },
    shouldAcuteOn(state, action) {
      state.shouldAcute = action.payload;
      state.shouldBeClicked['Semicolon'] = true;
    },
    shouldAcuteOff(state) {
      state.shouldAcute = false;
      state.shouldBeClicked['Semicolon'] = false;

    },
    shouldShiftOn(state) {
      state.shouldShift = true;
    },
    shouldShiftOff(state) {
      state.shouldShift = false;
    },
    shouldDiaeresisOn(state, action) {
      state.shouldBeClicked[SHIFT] = true;
      state.shouldBeClicked['Semicolon'] = true;
      state.shouldDiaeresis = action.payload;
    },
    shouldDiaeresisOff(state) {
      state.shouldDiaeresis = false;
    },
    keyToBeClicked(state, action) {
      state.shouldBeClicked[action.payload] = true;
    },

    shouldDiaeresisWithAcuteOn(state, action) {
      state.shouldBeClicked[SHIFT] = true;
      state.shouldBeClicked['KeyW'] = true;
      state.shouldDiaeresisWithAcute = action.payload;
    },
    shouldDiaeresisWithAcuteOff(state) {
      state.shouldDiaeresisWithAcute = false;
    },
    clearShouldBeClicked(state) {
      state.shouldBeClicked = { ...strokes };
    },
  },
});

const store = configureStore({ reducer: keyboardSlice.reducer });
export default store;

export const keyboardActions = keyboardSlice.actions;
