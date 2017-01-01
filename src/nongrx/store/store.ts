import {registerStore} from "nongrx/store";
import {reducers} from "../reducers";
import {CounterEffects} from "../effects";

export const store = registerStore(reducers);
store.addEffects(CounterEffects);
