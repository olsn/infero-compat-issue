import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {SetsState} from "nongrx/inferno";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

export class Counter extends Component<{}, {store: Store<number>}> {
    store: Store<number> = this.context.store;

    @SetsState()
    counter: Observable<number> = this.store;

    @SetsState()
    square: Observable<number> = this.store.map(x => x * x);

    constructor(public props, public context) {
        super(props, context);
    }

    clickedBtn(delayed: boolean = false) {
        this.context.store.dispatch({type: delayed ? "up_delayed" : "up", payload: 1});
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