import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {IState} from "../../nongrx/reducers";
import * as grid from "../../nongrx/actions/grid.actions";
import {COMPONENT_DICT} from "../grid-component";

export class MenuBar extends Component<{}, {store: Store<IState>}> {
    store: Store<IState> = this.context.store;

    constructor(public props, public context) {
        super(props, context);
    }

    addItem(component: string) {
        this.context.store.dispatch(new grid.AddItemAction(component));
    }

    render() {
        return (
            <div>
                {Object.keys(COMPONENT_DICT).map(key => <button onClick={() => this.addItem(key)}>New {key}</button>)}
            </div>
        );
    }
}
