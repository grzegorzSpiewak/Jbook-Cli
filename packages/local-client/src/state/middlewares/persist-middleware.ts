import { Dispatch } from 'redux';
import { Action } from 'state/actions';
import { ActionType } from 'state/aciton-types';
import { saveCells } from 'state/action-creators';
import { RootState } from 'state/reducers';
 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const persistMiddlware = ({
  dispatch,
  getState,
} : {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any;

  return (next: (action: Action) => void) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};