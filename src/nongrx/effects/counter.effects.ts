import {Effect, Actions} from "nongrx/effects";
import "rxjs/add/operator/mapTo";

export class CounterEffects {
    constructor(private actions$: Actions) {}

    @Effect()
    dummyEffect = this.actions$
        .ofType("up")
        .mapTo({type: "test", payload: -1});
}