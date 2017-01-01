import { createSelector } from 'reselect';
import * as fromCounter from "./counter.reducer";
import * as fromGrid from "./grid.reducer";
import * as fromData from "./data.reducer";

export interface IState {
    counter: fromCounter.IState;
    grid: fromGrid.IState;
    data: fromData.IState;
}

export const reducers = {
    counter: fromCounter.reducer,
    grid: fromGrid.reducer,
    data: fromData.reducer
};

// Counter
export const getCounterState = (state: IState) => state.counter;

export const getCount = createSelector(getCounterState, fromCounter.getCount);
export const getLastIncrement = createSelector(getCounterState, fromCounter.getLastIncrement);

// Grid
export const getGridState = (state: IState) => state.grid;

export const getGridItems = createSelector(getGridState, fromGrid.getItems);

// Data
export const getDataState = (state: IState) => state.data;