import { Action, actionType } from 'nongrx/store';

export const ActionTypes = {
    INCREMENT:          actionType('[Counter] Increment'),
    INCREMENT_DELAYED:  actionType('[Counter] Increment Delayed')
};

export class IncrementAction implements Action {
    type = ActionTypes.INCREMENT;

    constructor(public payload: number) { }

    static fromIncrementDelayedAction(fromAction: IncrementDelayedAction): IncrementAction {
        return new IncrementAction(fromAction.payload);
    }
}

export class IncrementDelayedAction implements Action {
    type = ActionTypes.INCREMENT_DELAYED;

    constructor(public payload: number) { }
}

export type Actions
    = IncrementAction
    | IncrementDelayedAction;