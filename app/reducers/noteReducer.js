// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import {
  UPDATE_NOTE,
  GET_ALL_NOTES,
  SELECTED_NOTE,
  CREATE_NEW
} from '../actions/noteActions';
import type { Action } from './types';

const initialState = {
  allNotes: [],
  selectedNote: {}
};

export default function counter(state = initialState, action: Action) {
  switch (action.type) {
    case CREATE_NEW:
      return { ...state, allNotes: [...state.allNotes, action.note] };
    case SELECTED_NOTE:
      return { ...state, selectedNote: action.note };
    case UPDATE_NOTE:
      return {
        ...state,
        selectedNote: { ...state.selectedNote, notes: action.note }
      };
    case GET_ALL_NOTES:
      return { ...state, allNotes: action.allNotes };
    default:
      return state;
  }
}
