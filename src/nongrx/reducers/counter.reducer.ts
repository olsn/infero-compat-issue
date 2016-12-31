import {Action} from "nongrx/store";

export const CounterReducer = (state = 0, action: Action): any => {
    console.log("Oldstate:", state, "Action:", action.type, "Payload:", action.payload);
    switch (action.type) {
        case "up":
            return state + (action.payload || 0);
    }

    return state;
};
