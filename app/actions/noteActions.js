const db = require('electron-db');
import type { GetState, Dispatch } from '../reducers/types';
// import * as storage from 'electron-json-storage';

//actions
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const GET_ALL_NOTES = 'GET_ALL_NOTES';
export const SELECTED_NOTE = 'SELECTED_NOTE';
export const SAVE = 'SAVE';

//dispatch
export const selectedNote = note => {
  return {
    type: SELECTED_NOTE,
    note
  };
};

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note
  };
}

export function getAllNotes(allNotes) {
  return {
    type: GET_ALL_NOTES,
    allNotes
  };
}

//thunks
export const saveThunk = (date, note) => async dispatch => {
  try {
    await db.updateRow(
      'notes',
      { date: date },
      { notes: note },
      (succ, msg) => {
        if (succ) {
          console.log('success saving');
        } else {
          console.log('error');
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
};
export const selectedNoteThunk = date => async dispatch => {
  try {
    await db.search('notes', 'date', date, (succ, data) => {
      if (succ) {
        console.log(data[0], 'from db in selectednote');
        dispatch(selectedNote(data[0]));
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllNotesThunk = () => async dispatch => {
  try {
    await db.getAll('notes', (succ, data) => {
      // succ - boolean, tells if the call is successful
      // data - array of objects that represents the rows.
      if (succ) {
        dispatch(getAllNotes(data));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateNoteThunk = note => dispatch => {
  dispatch(updateNote(note));
};
