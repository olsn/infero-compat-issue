import { Reducer, ActionReducer } from '@ngrx/store/src/reducer';
import { Dispatcher } from '@ngrx/store/src/dispatcher';
import { Store } from '@ngrx/store/src/store';
import { State } from '@ngrx/store/src/state';
import { combineReducers } from '@ngrx/store/src/utils';

function _initialReducerFactory(reducer) {
    if (typeof reducer === 'function') {
        return reducer;
    }
    return combineReducers(reducer);
}

function _initialStateFactory(initialState, reducer) {
    if (!initialState) {
        return reducer(undefined, { type: Dispatcher.INIT });
    }
    return initialState;
}

function _storeFactory(dispatcher, reducer, state$) {
    return new Store(dispatcher, reducer, state$);
}

function _stateFactory(initialState: any, dispatcher: Dispatcher, reducer: Reducer) {
    return new State(initialState, dispatcher, reducer);
}

function _reducerFactory(dispatcher, reducer) {
    return new Reducer(dispatcher, reducer);
}

export function registerStore<T>(actionReducer: ActionReducer<T>, initialState?: T): Store<T> {
    actionReducer = _initialReducerFactory(actionReducer);
    initialState = _initialStateFactory(initialState, actionReducer);

    const dispatcher = new Dispatcher();
    const reducer = _reducerFactory(dispatcher, actionReducer);
    const state = _stateFactory(initialState, dispatcher, reducer);
    return _storeFactory(dispatcher, reducer, state);
}
