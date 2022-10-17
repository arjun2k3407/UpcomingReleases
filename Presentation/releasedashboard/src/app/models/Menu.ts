import { MenuItem } from "./MenuItem";

export interface Menu {
    id: number;
    header: string;
    items: MenuItem[];
    position?: string;
    prevId?: number;
}