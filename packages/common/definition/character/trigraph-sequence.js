"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable quotes */
const ramda_1 = __importDefault(require("ramda"));
exports.trigraphSequenceMapper = [
    ['??=', '#'],
    ['??(', '['],
    ['??/', '\\'],
    ['??)', ']'],
    ["??'", '^'],
    ['??<', '{'],
    ['??!', '|'],
    ['??>', '}'],
    ['??-', '~']
];
exports.trigraphSequence = ramda_1.default.map(n => n[0], exports.trigraphSequenceMapper);
