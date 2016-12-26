import {render} from "inferno";
import * as createElement from "inferno-create-element";
import * as Component from "inferno-component";
import {registerStore, Store} from "./store";
import {Provider} from "./provider";
import {Effect} from "./effects";
import "rxjs/add/operator/takeUntil";
import {SetsState} from "./store.decorators";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mapTo";
import {Resizable} from 'react-resizable';

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

////////////////////////////////////////////////////////
// REDUCER
const reducer = (state = 0, action: any): any => {
    console.log("StateChange:", state, action.type, action.payload);
    return state + (action.payload || 0);
};

////////////////////////////////////////////////////////
// EFFECTS
class ButtonEffects {
    constructor(private store: Store<any>) {}

    @Effect()
    dummyEffect = this.store.actions$
        .ofType("up")
        .mapTo({type: "test", payload: -1});
}

////////////////////////////////////////////////////////
// The Component
class Button extends Component<{}, {store: Store<any>}> {
    store: Store<any> = this.context.store;

    @SetsState("counter")
    counter$: Observable<any> = this.store;

    @SetsState("square")
    square$: Observable<any> = this.store.map(x => x*x);

    constructor(public props, public context) {
        super(props, context);
    }

    clickedBtn(num: number = 1) {
        this.context.store.dispatch({type: "up", payload: num});
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

class AppD extends Component<{}, {}> {
    constructor() {
        super();
        this.state = {
            height: 200,
            width: 200
        }
    }

    render() {
        const layouts = {
            lg: [
                {i: 'a', x: 0, y: 0, w: 1, h: 2, isResizable: false },
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ],
            md: [
                {i: 'a', x: 0, y: 0, w: 1, h: 2},
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ],
            sm: [
                {i: 'a', x: 0, y: 0, w: 1, h: 2},
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ],
            xs: [
                {i: 'a', x: 0, y: 0, w: 1, h: 2},
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}
            ]
        };

        return (
            <div>
                <ResponsiveReactGridLayout className="layout" layouts={layouts}
                                           breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                           cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                    <div key={"a"} className="bg-grey"><Button/></div>
                    <div key={"b"} className="bg-grey"><Button/></div>
                    <div key={"c"} className="bg-grey">{"<-- Test -->"}</div>
                </ResponsiveReactGridLayout>
                <div>
                    <Resizable className="box" height={this.state.height} width={this.state.width}>
                        <div className="box" style={{width: this.state.width + 'px', height: this.state.height + 'px'}}>
                            <span className="text">Raw use of element. 200x200, no constraints.</span>
                        </div>
                    </Resizable>
                </div>
            </div>
        );
    }
}

function Output({count}) {
     return <span>Test! Count: {count}</span>
}

////////////////////////////////////////////////////////
// The Store
const store = registerStore(reducer);
store.addEffects(ButtonEffects);

render(
    <Provider store={store}>
        <AppD/>
    </Provider>,
    document.getElementById("app")
);
