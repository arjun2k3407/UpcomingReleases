import { Branch } from "./Branch";
import { DB } from "./DB";

export interface Release {
    id: string;
    citrixId: string;
    name: string;
    prodLike: boolean;
    backend: String;
    devDB?: DB;
    devInstance?: string;
    testInstance?: string;
    testDB?: DB;
    branch?: Branch;
    date: any;
    comments?: string;
}