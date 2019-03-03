// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import {
  UPDATE_NOTE,
  GET_ALL_NOTES,
  SELECTED_NOTE,
  CREATE_NEW,
  TRACK_UNSAVE
} from '../actions/noteActions';
import type { Action } from './types';

const initialState = {
  allNotes: [],
  selectedNote: {}
};

export default function counter(state = initialState, action: Action) {
  let newList = [...state.allNotes];
  switch (action.type) {
    case TRACK_UNSAVE:
      newList = newList.map(x => {
        if (x.date == action.note.date) {
          x.save = true;
        }
        return x;
      });
      return { ...state, allNotes: newList };
    case CREATE_NEW:
      return { ...state, allNotes: [...state.allNotes, action.note] };
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
