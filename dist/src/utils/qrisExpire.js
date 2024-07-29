"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = exports.qrisExpire = void 0;
const qrisExpire = (seconds) => {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + seconds);
    const expirationTimestamp = expirationDate.getTime();
    return expirationTimestamp;
};
exports.qrisExpire = qrisExpire;
const isExpired = (expiresAt) => {
    const expiresAtDate = new Date(expiresAt);
    const now = new Date();
    return now > expiresAtDate;
};
exports.isExpired = isExpired;
