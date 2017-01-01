import {Action, actionType} from "nongrx/store";

export const ActionTypes = {
    SET: actionType("[Data] Set"),
    APPEND: actionType("[Data] Append")
};

export interface IDataActionPayload {
    key: string;
    data: any;
}

export class SetDataAction implements Action {
    type = ActionTypes.SET;
    payload: IDataActionPayload;

    constructor(key: string, data: any) {
        this.payload = {key, data};
    }
}

export class AppendDataAction implements Action {
    type = ActionTypes.APPEND;
    payload: IDataActionPayload;

    constructor(key: string, data: any) {
        this.payload = {key, data};
    }
}

export type Actions
    = SetDataAction
    | AppendDataAction;
