// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import {
  UPDATE_NOTE,
  GET_ALL_NOTES,
  SELECTED_NOTE
} from '../actions/noteActions';
import type { Action } from './types';

const initialState = {
  currentNote: '# Hello World',
  allNotes: [],
  selectedNote: {}
};

export default function counter(state = initialState, action: Action) {
  switch (action.type) {
    case SELECTED_NOTE:
      return { ...state, selectedNote: action.note };
    case UPDATE_NOTE:
      return { ...state, currentNote: action.note };
    case GET_ALL_NOTES:
      return { ...state, allNotes: action.allNotes };
    default:
      return state;
  }
}
