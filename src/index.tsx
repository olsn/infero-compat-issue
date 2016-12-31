import {render} from "inferno";
import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Provider} from "nongrx/inferno";
import "rxjs/add/operator/takeUntil";
import {Resizable} from "react-resizable";
import {store} from "./nongrx";
import {Counter} from "./components";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {Responsive, WidthProvider} from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class App extends Component<{}, {}> {
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
                {i: 'a', x: 0, y: 0, w: 3, h: 2},
                {i: 'b', x: 3, y: 0, w: 3, h: 2}
            ],
            md: [
                {i: 'a', x: 0, y: 0, w: 3, h: 2},
                {i: 'b', x: 3, y: 0, w: 3, h: 2}
            ],
            sm: [
                {i: 'a', x: 0, y: 0, w: 3, h: 2},
                {i: 'b', x: 3, y: 0, w: 3, h: 2}
            ],
            xs: [
                {i: 'a', x: 0, y: 0, w: 3, h: 2},
                {i: 'b', x: 3, y: 0, w: 3, h: 2}
            ],
            xxs: [
                {i: 'a', x: 0, y: 0, w: 3, h: 2},
                {i: 'b', x: 3, y: 0, w: 3, h: 2}
            ]
        };

        return (
            <div>
                <ResponsiveReactGridLayout className="layout" layouts={layouts}
                                           breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                           cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                    <div key={"a"} className="bg-grey"><Counter/></div>
                    <div key={"b"} className="bg-grey"><Counter/></div>
                </ResponsiveReactGridLayout>
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
