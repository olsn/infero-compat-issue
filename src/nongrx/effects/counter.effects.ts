import {Effect, Actions} from "nongrx/effects";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";
import * as counter from "./../actions/counter.actions";

export class CounterEffects {
    constructor(private actions$: Actions) {}

    @Effect()
    delayEffect = this.actions$
        .ofType(counter.ActionTypes.INCREMENT_DELAYED)
        .delay(1000)
        .map(counter.IncrementAction.fromIncrementDelayedAction);
}