import { createSelector } from 'reselect';
import * as fromCounter from "./counter.reducer";

export interface IState {
    counter: fromCounter.IState;
}

export const reducers = {
    counter: fromCounter.reducer
};

export const getCounterState = (state: IState) => state.counter;

export const getCount = createSelector(getCounterState, fromCounter.getCount);
export const getLastIncrement = createSelector(getCounterState, fromCounter.getLastIncrement);