import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {SetsState} from "nongrx/inferno";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import * as counter from "./../../nongrx/actions/counter.actions";
import {IState, getCount} from "../../nongrx/reducers";

export class Counter extends Component<{}, {store: Store<IState>}> {
    store: Store<IState> = this.context.store;

    @SetsState()
    counter: Observable<number> = this.store.select(getCount);

    @SetsState()
    square: Observable<number> = this.counter.map(x => x * x);

    constructor(public props, public context) {
        super(props, context);
        console.log("newww!", this);

        this["componentWillUnmount"] = () => {
            console.log("Counter will unmount?!");
        }
    }

    clickedBtn(delayed: boolean = false) {
        const action: counter.Actions = delayed
            ? new counter.IncrementDelayedAction(1)
            : new counter.IncrementAction(1);
        this.context.store.dispatch(action);
    }

    render() {
        return (
            <div>
                Count: {this.state.counter}
                <br/>
                Squared: {this.state.square}
                <br/>
                <button onClick={() => this.clickedBtn()}>Count up instant</button>
                <br/>
                <button onClick={() => this.clickedBtn(true)}>Count up delayed 1s</button>
            </div>
        );
    }
}
