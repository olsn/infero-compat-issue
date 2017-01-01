import {Store} from "nongrx/store";
import Component from "inferno-component";
import {IState} from "../nongrx/reducers/index";

export class GridComponent<T> extends Component<T, {store: Store<IState>}> {
    constructor(public props: T, public context) {
        super(props, context);
    }

    static create(props?: any) {
        throw new Error("'Create' is not implemented for this component.");
    }
}

export const COMPONENT_DICT: {[key: string]: typeof GridComponent} = {};

export function RegisterGridComponent(name: string) {
    return function (constructor: typeof GridComponent) {
        if (COMPONENT_DICT[name]) {
            throw new Error(`There is already a component registered by the name of "${name}".`);
        }

        COMPONENT_DICT[name] = constructor;
    }
}