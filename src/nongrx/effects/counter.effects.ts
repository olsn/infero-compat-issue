import {Effect, Actions} from "nongrx/effects";
import "rxjs/add/operator/map";
import "rxjs/add/operator/delay";

export class CounterEffects {
    constructor(private actions$: Actions) {}

    @Effect()
    delayEffect = this.actions$
        .ofType("up_delayed")
        .delay(1000)
        .map(action => ({...action, type: "up"}));
}