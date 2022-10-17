export interface Server {
    db: string;
    foLog: string;
    wsLog: string;
    boLog: string;
    jmLog?: string;
    foHost: string;
    jmHost?: string;
    boAppHost: string;
    boHost: string;
    foPort: string;
    boPort: string;
    jmPort?: string;
    esPort: string;
    displayName: string;
    tns?: string[];
}