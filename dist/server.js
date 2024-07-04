"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
require("dotenv/config");
var app_1 = __importDefault(require("@/app"));
var auth_route_1 = __importDefault(require("@routes/auth.route"));
var validateEnv_1 = __importDefault(require("@utils/validateEnv"));
(0, validateEnv_1["default"])();
var app = new app_1["default"]([new auth_route_1["default"]()]);
app.listen();
//# sourceMappingURL=server.js.map