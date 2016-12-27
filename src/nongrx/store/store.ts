import {registerStore} from "nongrx/store";
import {CounterReducer} from "../reducers";
import {CounterEffects} from "../effects";

export const store = registerStore(CounterReducer);
store.addEffects(CounterEffects);
