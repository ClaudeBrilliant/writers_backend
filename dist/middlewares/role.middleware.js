"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = void 0;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        console.log(req.body);
        if (!req.user) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'You do not have the required permissions'
            });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
