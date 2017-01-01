import createElement from "inferno-create-element";
import {Store} from "nongrx/store";
import {SetsState} from "nongrx/inferno";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/repeat";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";
import "rxjs/add/observable/of";
import "rxjs/add/observable/timer";
import {IState, getDataState} from "../../nongrx/reducers";
import {GridComponent, RegisterGridComponent} from "../grid-component";
import * as data from "../../nongrx/actions/data.actions";

import "./kpi.scss";

@RegisterGridComponent("KPI")
export class KPI extends GridComponent<{source: string, label: string}> {
    store: Store<IState> = this.context.store;
    willUnmount$ = new Subject();

    @SetsState()
    value: Observable<any> = this.store
        .select(getDataState)
        .map(val => val[this.props.source])
        .map(val => val != null ? val : 0)
        .publishReplay(1)
        .refCount();

    constructor(public props, public context) {
        super(props, context);
    }

    componentDidMount() {
        // temp mocking
        Observable.of("")
            .switchMap(() => Observable.timer(Math.random() * 1500 + 1500))
            .switchMapTo(this.value.take(1))
            .do(val => this.store.dispatch(new data.SetDataAction(this.props.source, val + 1)))
            .repeat()
            .takeUntil(this.willUnmount$)
            .subscribe(undefined, err => console.error(err));
    }

    componentWillUnmount() {
        this.willUnmount$.next(true);
    }

    render() {
        return (
            <div className="kpi">
                <div className="kpi-value">{this.state.value}</div>
                <div className="kpi-label">{this.props.label}</div>
            </div>
        );
    }

    static create({source, label}: any) {
        return <KPI source={source} label={label}/>;
    }
}
