"use strict";
exports.__esModule = true;
var envalid_1 = require("envalid");
var validateEnv = function () {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)()
    });
};
exports["default"] = validateEnv;
//# sourceMappingURL=validateEnv.js.map