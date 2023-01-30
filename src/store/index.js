import { createSlice, configureStore } from "@reduxjs/toolkit";
import { strokes } from "../assets/Strokes";
import { SHIFT } from "../assets/Variables";
import { nextStrokes } from "./actionNextStrokes";
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
  nextToBeClickedComposing: false,
  textIndex: 1,
  error: false,
  showModal: false,
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: initialState,
  reducers: {
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    changeDifficulty(state, action) {
      state.textIndex = action.payload;
    },
    setError(state) {
      state.error = true;
    },
    unsetError(state) {
      state.error = false;
    },
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

    clearInputText(state) {
      state.inputText = "";
    },
    updateInputText(state, action) {
      let result;
      // [sdb, shouldShift, nextToBeClickedComposing]
      if (!action.payload.newText) {
        state.inputText = "";
        result = nextStrokes(
          "",
          state.textIndex,
          state.language,
          state.nextToBeClickedComposing
        );
      } else {
        state.inputText = action.payload.newText;

        result = nextStrokes(
          action.payload.newText,
          state.textIndex,
          state.language,
          state.nextToBeClickedComposing
        );
      }
      const [sdb, shouldShift, nextToBeClickedComposing] = result;

      state.shouldBeClicked = sdb;
      state.shouldShift = shouldShift;
      state.nextToBeClickedComposing = nextToBeClickedComposing;
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
      state.shouldBeClicked["Semicolon"] = true;
    },
    shouldAcuteOff(state) {
      state.shouldAcute = false;
      state.shouldBeClicked["Semicolon"] = false;
    },
    shouldShiftOn(state) {
      state.shouldShift = true;
    },
    shouldShiftOff(state) {
      state.shouldShift = false;
    },
    shouldDiaeresisOn(state, action) {
      state.shouldBeClicked[SHIFT] = true;
      state.shouldBeClicked["Semicolon"] = true;
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
      state.shouldBeClicked["KeyW"] = true;
      state.shouldDiaeresisWithAcute = action.payload;
    },
    shouldDiaeresisWithAcuteOff(state) {
      state.shouldDiaeresisWithAcute = false;
    },
    clearShouldBeClicked(state) {
      state.shouldBeClicked = { ...strokes };
    },
    clearClicked(state) {
      state.clicked = { ...strokes };
    },
  },
});

const store = configureStore({ reducer: keyboardSlice.reducer });
export default store;

export const keyboardActions = keyboardSlice.actions;
