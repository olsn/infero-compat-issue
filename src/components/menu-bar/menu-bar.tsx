import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {IState} from "../../nongrx/reducers";
import {GridComponent} from "../../nongrx/models/grid-item";
import * as grid from "../../nongrx/actions/grid.actions";

export class MenuBar extends Component<{}, {store: Store<IState>}> {
    store: Store<IState> = this.context.store;

    constructor(public props, public context) {
        super(props, context);
    }

    addItem(component: GridComponent) {
        this.context.store.dispatch(new grid.AddItemAction(component));
    }

    render() {
        return (
            <div>
                Add component: <button onClick={() => this.addItem(GridComponent.COUNTER)}>Counter</button> | <button onClick={() => this.addItem(GridComponent.STATUS)}>Stats</button>
            </div>
        );
    }
}
