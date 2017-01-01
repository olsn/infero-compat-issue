import { createSelector } from 'reselect';
import * as fromCounter from "./counter.reducer";
import * as fromGrid from "./grid.reducer";

export interface IState {
    counter: fromCounter.IState;
    grid: fromGrid.IState;
}

export const reducers = {
    counter: fromCounter.reducer,
    grid: fromGrid.reducer
};

// Counter
export const getCounterState = (state: IState) => state.counter;

export const getCount = createSelector(getCounterState, fromCounter.getCount);
export const getLastIncrement = createSelector(getCounterState, fromCounter.getLastIncrement);

// Grid
export const getGridState = (state: IState) => state.grid;

export const getGridItems = createSelector(getGridState, fromGrid.getItems);