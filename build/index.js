"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.createWithOffset = exports.create = void 0;
const crypto_js_1 = require("crypto-js");
const create = (data) => {
    const time = Math.floor(Date.now() / 1000).toFixed();
    const timestamp = (0, crypto_js_1.SHA256)(time).toString();
    const dataCrypto = (0, crypto_js_1.SHA256)(data).toString();
    const sum = (0, crypto_js_1.SHA256)(timestamp + dataCrypto).toString();
    return { key: timestamp + dataCrypto + sum, timestamp: time };
};
exports.create = create;
const createWithOffset = (data, timestamp) => {
    const timestampHash = (0, crypto_js_1.SHA256)(timestamp).toString();
    const sum = (0, crypto_js_1.SHA256)(timestampHash + data);
    return timestampHash + data + sum;
};
exports.createWithOffset = createWithOffset;
const verify = (data) => {
    const timestamp = data.slice(0, 64);
    const dataCrypto = data.slice(64, 128);
    const sumOld = data.slice(128, 192);
    const sum = (0, crypto_js_1.SHA256)(timestamp + dataCrypto).toString();
    return sum === sumOld;
};
exports.verify = verify;
const icekey = {
    create: exports.create,
    createWithOffset: exports.createWithOffset,
    verify: exports.verify
};
exports.default = icekey;
