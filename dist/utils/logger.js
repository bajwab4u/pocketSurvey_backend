"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.stream = exports.logger = void 0;
var config_1 = __importDefault(require("config"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var winston_1 = __importDefault(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// logs dir
var logDir = path_1["default"].join(__dirname, config_1["default"].get('log.dir'));
if (!fs_1["default"].existsSync(logDir)) {
    fs_1["default"].mkdirSync(logDir);
}
// Define log format
var logFormat = winston_1["default"].format.printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
var logger = winston_1["default"].createLogger({
    format: winston_1["default"].format.combine(winston_1["default"].format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), logFormat),
    transports: [
        // debug log setting
        new winston_daily_rotate_file_1["default"]({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/debug',
            filename: "%DATE%.log",
            maxFiles: 30,
            json: false,
            zippedArchive: true
        }),
        // error log setting
        new winston_daily_rotate_file_1["default"]({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: "%DATE%.log",
            maxFiles: 30,
            handleExceptions: true,
            json: false,
            zippedArchive: true
        }),
    ]
});
exports.logger = logger;
logger.add(new winston_1["default"].transports.Console({
    format: winston_1["default"].format.combine(winston_1["default"].format.splat(), winston_1["default"].format.colorize())
}));
var stream = {
    write: function (message) {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};
exports.stream = stream;
//# sourceMappingURL=logger.js.map