/* eslint-disable complexity */
/* eslint-disable eqeqeq */
// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import {
  UPDATE_NOTE,
  GET_ALL_NOTES,
  SELECTED_NOTE,
  CREATE_NEW,
  TRACK_UNSAVE,
  SAVE,
  SAVE_ALL,
  DELETE_NOTE
} from '../actions/noteActions';
import type { Action } from './types';

const initialState = {
  allNotes: [],
  selectedNote: {}
};

export default function counter(state = initialState, action: Action) {
  let newList = [...state.allNotes];
  let newSelected = { ...state.selectedNote };
  switch (action.type) {
    case DELETE_NOTE:
      newList = newList.filter(x => x.id !== action.id);
      return { ...state, allNotes: newList };
    case SAVE_ALL:
      return { ...state, allNotes: action.savedNotes };
    case SAVE:
      newList = newList.map(x => {
        if (x.date == action.date) {
          delete x.save;
        }
        return x;
      });
      delete newSelected.save;
      return { ...state, allNotes: newList, selectedNote: newSelected };
    case TRACK_UNSAVE:
      newList = newList.map(x => {
        if (x.date == action.note.date) {
          x.save = true;
        }
        return x;
      });
      return { ...state, allNotes: newList };
    case CREATE_NEW:
      return {
        ...state,
        allNotes: [...state.allNotes, action.note],
        selectedNote: action.note
      };
    case SELECTED_NOTE:
      return { ...state, selectedNote: action.note };
    case UPDATE_NOTE:
      newList = newList.map(x => {
        if (x.date == state.selectedNote.date) {
          x.notes = action.note;
        }
        return x;
      });
      return {
        ...state,
        allNotes: newList,
        selectedNote: { ...state.selectedNote, notes: action.note }
      };
    case GET_ALL_NOTES:
      return { ...state, allNotes: action.allNotes };
    default:
      return state;
  }
}
