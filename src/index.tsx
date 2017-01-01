import {render} from "inferno";
import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Provider} from "nongrx/inferno";
import "rxjs/add/operator/takeUntil";
import {Resizable} from "react-resizable";
import {store} from "./nongrx";
import {Grid} from "./components";
import {MenuBar} from "./components/menu-bar/menu-bar";
import {Counter} from "./components/counter/counter";

class App extends Component<{}, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <MenuBar/>
                <hr/>
                <Grid/>
            </div>
        );
    }
}

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app")
);
