import {Action, actionType} from "nongrx/store";
import {IGridItem, GridComponent} from "../models/grid-item";

export const ActionTypes = {
    ADD_ITEM: actionType("[Grid] Add Item"),
    REMOVE_ITEM: actionType("[Grid] Remove Item"),
    UPDATE_LAYOUT: actionType("[Grid] Update layout")
};

export class AddItemAction implements Action {
    type = ActionTypes.ADD_ITEM;
    payload: IGridItem;

    constructor(component: GridComponent) {
        this.payload = {
            i: (+new Date()).toString(),
            component,
            x: 0,
            y: 0,
            w: 6,
            h: 2
        };
    }
}

export class RemoveItemAction implements Action {
    type = ActionTypes.REMOVE_ITEM;

    constructor(public payload: string) {}
}

export class UpdateLayoutAction implements Action {
    type = ActionTypes.UPDATE_LAYOUT;

    constructor(public payload: any) {}
}

export type Actions
    = AddItemAction
    | RemoveItemAction
    | UpdateLayoutAction;