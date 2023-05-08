import { SHA256 } from "crypto-js";

type icekeyExport = {
    create: (data: string) => {
        key: string;
        timestamp: string;
    };
    createWithOffset: (data: string, timestamp: string) => string;
    verify: (data: string) => boolean;
}

export const create = (data: string): {key: string, timestamp: string} => {
    const time = Math.floor(Date.now() / 1000).toFixed();
    const timestamp = SHA256(time).toString();
    const dataCrypto = SHA256(data).toString();
    const sum = SHA256(timestamp + dataCrypto).toString();
    return {key: timestamp + dataCrypto + sum, timestamp: time};
}

export const createWithOffset = (data: string, timestamp: string): string => {
    const timestampHash = SHA256(timestamp).toString();
    const sum = SHA256(timestampHash + data)
    return timestampHash + data + sum;
}

export const verify = (data: string): boolean => {
    const timestamp = data.slice(0, 64);
    const dataCrypto = data.slice(64, 128);
    const sumOld = data.slice(128, 192);
    const sum = SHA256(timestamp + dataCrypto).toString();
    return sum === sumOld;
}

const icekey: icekeyExport = {
    create: create,
    createWithOffset: createWithOffset,
    verify: verify
}

export default icekey;