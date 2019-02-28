const db = require('electron-db');
import type { GetState, Dispatch } from '../reducers/types';
// import * as storage from 'electron-json-storage';

//actions
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const GET_ALL_NOTES = 'GET_ALL_NOTES';

//dispatch
export function increment() {
  return {
    type: ADD_NOTE
  };
}

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

// export function addNoteThunk(input) {
//   return async (dispatch: Dispatch, getState: GetState) => {
//     // console.log(input, 'click from thunk');
//     try {
//       // let allData;
//       // await storage.getAll('input', function(error, data) {
//       //   if (error) throw error;
//       //   allData = data.input;
//       //   if (Array.isArray(allData)) {
//       //     allData.push({ value: input });
//       //   } else {
//       //     allData = [{ ...allData }];
//       //   }
//       //   storage.set('input', allData, function(errors) {
//       //     if (errors) throw errors;
//       //   });
//       // });
//     } catch (error) {
//       console.error(error);
//     }

//     //   dispatch(increment());
//   };
// }
