"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// sanityClient.ts
const client_1 = require("@sanity/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.client = (0, client_1.createClient)({
    projectId: 'l2ju9ltx', // Replace with your project ID
    dataset: 'production', // Or your dataset name
    apiVersion: '2025-01-13', // Today's date or latest API version
    useCdn: false, // Disable CDN for real-time updates
    token: 'skmUIwfCH28k34hULTxMQPylPy545OYcnWiK9yVKJcdsCI0yHpAXABpt515OzqE9Jf4wKI0MPKRmmLbgIqNOSSULPPXKwbPtr6cdTFtOKuZjRbIKs4OlsfdsprVMg1xINx7Fmr2Xlp8L0W22nYV3mvc7hTQz2Yc10bkfgimY1f9M7F32r8eZ',
});
