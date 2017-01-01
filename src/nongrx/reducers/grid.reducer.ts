import * as grid from "./../actions/grid.actions";
import {IGridItem} from "../models/grid-item";

export interface IState {
    items: IGridItem[];
}

const initialState: IState = {
    items: [
        {i: 'a', x: 0, y: 0, w: 2, h: 2, component: "Counter"}
    ]
};

export const reducer = (state: IState = initialState, action: grid.Actions): any => {
    switch (action.type) {
        case grid.ActionTypes.ADD_ITEM:
            const itemToAdd = <IGridItem>action.payload;
            return {
                ...state,
                items: [...state.items, {...itemToAdd}]
            };
        case grid.ActionTypes.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.i !== action.payload)
            };
        case grid.ActionTypes.UPDATE_LAYOUT:
            return {
                ...state,
                items: action.payload.map((item, i) => ({...state.items[i], ...item}))
            };
        default: {
            return state;
        }
    }
};

export const getItems = (state: IState) => state.items;