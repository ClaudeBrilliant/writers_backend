"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const logger_config_1 = __importDefault(require("./config/logger.config"));
const config_1 = require("./config");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const training_routes_1 = __importDefault(require("./routes/training.routes"));
const training_application_routes_1 = __importDefault(require("./routes/training.application.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const task_application_routes_1 = __importDefault(require("./routes/task.application.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions)); // Apply CORS
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('combined', { stream: { write: (message) => logger_config_1.default.info(message.trim()) } }));
dotenv_1.default.config();
/**
 * Routes
 */
app.use('/api/categories', category_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api', user_routes_1.default);
app.use('/api', transaction_routes_1.default);
app.use('/api', training_routes_1.default);
app.use('/api', training_application_routes_1.default);
app.use('/api', task_routes_1.default);
app.use('/api', task_application_routes_1.default);
app.use('/api', profile_routes_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is up and running' });
});
// Catch-all for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
// Start the server
const server = app.listen(config_1.env.port, () => {
    logger_config_1.default.info(`Server started on port ${config_1.env.port}`);
});
// Graceful shutdown
const gracefulShutdown = () => {
    logger_config_1.default.info('Received shutdown signal. Shutting down gracefully...');
    server.close(() => {
        logger_config_1.default.info('Server closed. Exiting process...');
        process.exit(0);
    });
    setTimeout(() => {
        logger_config_1.default.error('Forcefully shutting down...');
        process.exit(1);
    }, 10000);
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
