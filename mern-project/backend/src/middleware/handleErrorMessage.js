"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handleErrorMessage;
const express_validator_1 = require("express-validator");
function handleErrorMessage(req, res, next) {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty())
        res.status(400).json({ errors: result.mapped() });
    else
        next();
}
