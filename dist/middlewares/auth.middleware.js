"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const config_1 = require("../config");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = (0, config_1.verifyToken)(token);
            req.user = decoded;
            next();
        }
        catch (error) {
            return res.status(403).json({
                error: 'Invalid Token',
            });
        }
    }
    else {
        res.status(401).json({
            error: 'Authorization header is missing',
        });
    }
};
exports.authenticateJWT = authenticateJWT;
