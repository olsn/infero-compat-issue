import createElement from "inferno-create-element";
import Component from "inferno-component";
import {Store} from "nongrx/store";
import {SetsState} from "nongrx/inferno";
import {Responsive, WidthProvider} from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/distinctUntilChanged";
import {IState, getGridItems} from "../../nongrx/reducers";
import {Status, Counter} from "../index";
import * as grid from "../../nongrx/actions/grid.actions";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {IGridItem} from "../../nongrx/models/grid-item";
import {COMPONENT_DICT} from "../grid-component";

export class Grid extends Component<{}, {store: Store<IState>}> {
    store: Store<IState> = this.context.store;

    @SetsState()
    gridItems: Observable<IGridItem[]> = this.store
        .select(getGridItems)
        .distinctUntilChanged();

    constructor(public props, public context) {
        super(props, context);
        this.state = {
            gridItems: []
        };
    }

    removeItem(itemKey: string): void {
        this.store.dispatch(new grid.RemoveItemAction(itemKey));
    }

    onLayoutChange(layout: any): void {
        this.store.dispatch(new grid.UpdateLayoutAction(layout));
    }

    render() {
        const layouts = {
            base: this.state.gridItems
        };

        const gridComponents = this.state.gridItems
            .map((item: IGridItem) => {
                return (
                    <div key={item.i} className="bg-grey">
                        <div className="remove-btn" onClick={() => this.removeItem(item.i)}>&#10006;</div>
                        {item.componentInstance ? item.componentInstance : item.componentInstance = COMPONENT_DICT[item.component].create({source: Math.random().toString(), label: "Pull Ups"})}
                    </div>
                );
            });

        return (
            <ResponsiveReactGridLayout className="layout" layouts={layouts}
                                       breakpoints={{base: 0}}
                                       cols={{base: 12}}
                                       onLayoutChange={(layout) => this.onLayoutChange(layout)}>
                {gridComponents}
            </ResponsiveReactGridLayout>
        );
    }
}
