"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((details) => details.message);
            return res.status(400).json({
                errors
            });
        }
        next();
    };
};
exports.validate = validate;
