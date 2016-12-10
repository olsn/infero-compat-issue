import {render} from "inferno";
import * as createElement from "inferno-create-element";
import * as Component from "inferno-component";
import {registerStore} from "./store";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";

const reducer = (state = 0, action: any): any => {
    return state + (action.payload || 0);
};

const store = registerStore(reducer);

class Button extends Component<{}, {}> {

    unmounted$ = new Subject();

    constructor() {
        super();
    }

    componentDidMount() {
        // update time every second
        store
            .takeUntil(this.unmounted$)
            .subscribe(counter => this.setState({counter}));
    }

    componentWillUnmount() {
        this.unmounted$.next();
    }

    clickedBtn(num: number = 1) {
        console.log("btn clicked!");
        store.dispatch({type: "up", payload: num});
    }

    render() {
        return (
            <div>
                <Output count={this.state.counter} />
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
