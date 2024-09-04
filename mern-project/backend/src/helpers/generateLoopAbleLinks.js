"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateLoopAbleLinks(totalPage) {
    const data = [];
    for (let i = 0; i < totalPage; i++) {
        data.push({ number: i + 1 });
    }
    ;
    return data;
}
exports.default = generateLoopAbleLinks;
