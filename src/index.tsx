import {render} from "inferno";
import * as createElement from "inferno-create-element";
import * as Component from "inferno-component";
import {registerStore} from "./store";
import {Effect} from "./effects";
import "rxjs/add/operator/takeUntil";
import {SetsState} from "./store.decorators";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mapTo";

////////////////////////////////////////////////////////
// REDUCER
const reducer = (state = 0, action: any): any => {
    console.log("StateChange:", state, action.type, action.payload);
    return state + (action.payload || 0);
};

////////////////////////////////////////////////////////
// EFFECTS
class ButtonEffects {
    @Effect()
    dummyEffect = store.actions$
        .ofType("up")
        .mapTo({type: "test", payload: -1});
}

////////////////////////////////////////////////////////
// The Store
const store = registerStore(reducer);
store.addEffects(ButtonEffects);

////////////////////////////////////////////////////////
// The Component
class Button extends Component<{}, {}> {

    @SetsState("counter")
    store: Observable<any> = store;

    @SetsState("square")
    store2: Observable<any> = store.map(x => x*x);

    constructor() {
        super();
    }

    clickedBtn(num: number = 1) {
        store.dispatch({type: "up", payload: num});
    }

    render() {
        return (
            <div>
                <Output count={this.state.counter} />
                <Output count={this.state.square} />
                <br/>
                <button onClick={() => this.clickedBtn(1)}>Count up!</button>
                <br/>
                <button onClick={() => this.clickedBtn(2)}>Count up 2!</button>
            </div>
        );
    }
}

function Output({count}) {
     return <span>Test! Count: {count}</span>
}

render(<Button/>, document.getElementById("app"));
