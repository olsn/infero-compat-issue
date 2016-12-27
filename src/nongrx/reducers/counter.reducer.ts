export const CounterReducer = (state = 0, action: any): any => {
    console.log("StateChange:", state, action.type, action.payload);
    return state + (action.payload || 0);
};
