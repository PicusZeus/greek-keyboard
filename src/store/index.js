import { createSlice, configureStore } from "@reduxjs/toolkit";
import { strokes } from "../assets/Strokes";
import { SHIFT, DEAD } from "../assets/Variables";

const initialState = {
  inputText: "",
  language: "gr",
  clicked: { ...strokes },
  shift: false,
  capslock: false,
  shouldBeClicked: { ...strokes },
  shouldShift: false,
  shouldDead: false,
  shouldShiftDead: false,
  shouldShiftWDead: false,
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
      state.inputText = state.inputText + action.payload
    },
    updateInputText(state, action) {
      state.inputText = action.payload
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


      state.clicked[action.payload] = true;

    },
    keyReleased(state, action) {
      state.clicked[action.payload] = false;
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
    shouldDeadOn(state, action) {
      state.shouldDead = action.payload;
      state.shouldBeClicked[DEAD] = true;
    },
    shouldDeadOff(state) {
      state.shouldDead = false;
      state.shouldBeClicked[DEAD] = false;
      console.log(state.shouldBeClicked[DEAD]);
    },
    shouldShiftOn(state) {
      state.shouldShift = true;
    },
    shouldShiftOff(state) {
      state.shouldShift = false;
    },
    shouldShiftDeadOn(state, action) {
      state.shouldBeClicked[SHIFT] = true;
      state.shouldBeClicked[DEAD] = true;
      state.shouldShiftDead = action.payload;
    },
    shouldShiftDeadOff(state) {
      state.shouldShiftDead = false;
    },
    keyToBeClicked(state, action) {
      state.shouldBeClicked[action.payload] = true;
    },

    shouldShiftWDeadOn(state, action) {
      state.shouldBeClicked[SHIFT] = true;
      state.shouldBeClicked["w"] = true;
      state.shouldShiftDead = action.payload;
    },
    shouldShiftWDeadOff(state) {
      state.shouldShiftWDead = false;
    },
    clearShouldBeClicked(state) {
      state.shouldBeClicked = { ...strokes };
    },
  },
});

const store = configureStore({ reducer: keyboardSlice.reducer });
export default store;

export const keyboardActions = keyboardSlice.actions;
