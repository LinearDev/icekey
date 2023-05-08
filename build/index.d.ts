type icekeyExport = {
    create: (data: string) => {
        key: string;
        timestamp: string;
    };
    createWithOffset: (data: string, timestamp: string) => string;
    verify: (data: string) => boolean;
};
export declare const create: (data: string) => {
    key: string;
    timestamp: string;
};
export declare const createWithOffset: (data: string, timestamp: string) => string;
export declare const verify: (data: string) => boolean;
declare const icekey: icekeyExport;
export default icekey;
//# sourceMappingURL=index.d.ts.map