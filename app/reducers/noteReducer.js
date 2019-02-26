// import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
import { UPDATE_NOTE } from '../actions/noteActions';
import type { Action } from './types';

const initialState = {
  currentNote: ''
};

export default function counter(state = initialState, action: Action) {
  switch (action.type) {
    case UPDATE_NOTE:
      return { ...state, currentNote: action.note };
    default:
      return state;
  }
}
