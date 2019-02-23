import type { GetState, Dispatch } from '../reducers/types';
import * as storage from 'electron-json-storage';

export function increment() {
  return {
    type: ADD_NOTE
  };
}

export function addNoteThunk(input) {
  return async (dispatch: Dispatch, getState: GetState) => {
    // console.log(input, 'click from thunk');
    try {
      let allData;
      await storage.getAll('input', function(error, data) {
        if (error) throw error;
        allData = data.input;
        if (Array.isArray(allData)) {
          allData.push({ value: input });
        } else {
          allData = [{ ...allData }];
        }
        storage.set('input', allData, function(errors) {
          if (errors) throw errors;
        });
      });
    } catch (error) {
      console.error(error);
    }

    //   dispatch(increment());
  };
}
