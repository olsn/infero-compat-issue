import * as counter from "./../actions/counter.actions";

export interface IState {
    count: number;
    lastIncrement?: Date;
}

const initialState = {
    count: 0
};

export const reducer = (state: IState = initialState, action: counter.Actions): any => {
    console.log("Oldstate:", state, "Action:", action.type, "Payload:", action.payload);
    switch (action.type) {
        case counter.ActionTypes.INCREMENT:
            return {
                ...state,
                count: state.count + action.payload,
                lastIncrement: new Date()
            };
        default: {
            return state;
        }
    }
};

export const getCount = (state: IState) => state.count;
export const getLastIncrement = (state: IState) => state.lastIncrement;