import * as data from "./../actions/data.actions";

export interface IState {
    [key: string]: any;
}

const initialState = {};

export const reducer = (state: IState = initialState, action: data.Actions): any => {
    switch (action.type) {
        case data.ActionTypes.SET:
            return {
                ...state,
                [action.payload.key]: action.payload.data
            };
        default: {
            return state;
        }
    }
};
