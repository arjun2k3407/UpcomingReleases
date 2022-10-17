export interface MenuItem {
    id: number;
    type: string;
    name?: string;
    link?: string;
    parentMenu: string;
    position?: string;
    prevId?: number;
}