"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dbConnection = void 0;
var config_1 = __importDefault(require("config"));
var path_1 = __importDefault(require("path"));
var _a = config_1["default"].get('dbConfig'), host = _a.host, user = _a.user, password = _a.password, database = _a.database;
exports.dbConnection = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'pocketSurvey',
    synchronize: true,
    logging: false,
    entities: [path_1["default"].join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [path_1["default"].join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [path_1["default"].join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
};
//# sourceMappingURL=index.js.map