export enum GridComponent {
    COUNTER = <any>"Counter",
    STATUS = <any>"Status"
}

export interface IGridItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    static?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;

    component: GridComponent;
}