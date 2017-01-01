import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {SetsState} from "nongrx/inferno";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMapTo";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/timer";
import {IState, getCount, getLastIncrement} from "../../nongrx/reducers";

export class Status extends Component<{}, {store: Store<IState>}> {
    store: Store<IState> = this.context.store;

    @SetsState()
    counter: Observable<number> = this.store.select(getCount);

    lastIncrement: Observable<Date> = this.store.select(getLastIncrement);

    @SetsState()
    secondsSinceLast: Observable<number> = Observable.merge(
        Observable.timer(0, 500),
        this.store
    )
        .switchMapTo(this.lastIncrement)
        .filter(x => !!x)
        .map(lastInc => ~~((+new Date() - +lastInc) / 1000))
        .startWith("-" as any);

    constructor(public props, public context) {
        super(props, context);
        console.log("RRRR", this);
    }

    render() {
        return (
            <div>
                Count: {this.state.counter}
                <br/>
                Elapsed seconds since last increment: {this.state.secondsSinceLast}
                <br/>
                <input type="text"/>
            </div>
        );
    }
}
