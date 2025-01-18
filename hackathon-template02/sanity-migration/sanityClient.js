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
    projectId: 'rjlk3aki', // Replace with your project ID
    dataset: 'production', // Or your dataset name
    apiVersion: '2025-01-13', // Today's date or latest API version
    useCdn: false, // Disable CDN for real-time updates
    token: 'skH7s4DSF59Xot3SSDRNON9BHGBa0ka2ks2VzsNMZAsOs058Q27gmHvc2NQKFI6mRuvoKi4t9c1ldMPzDxjdH2wAIJhHqzQ72XmZE5crZYfkpI6Ue96O3ETPIj1RRuxCDqjyQuHidejB8HBZC1lI9HsV5OJa1cKt6M4e3vcH8QTHJGsP6Gw8',
});
