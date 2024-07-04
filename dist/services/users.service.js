"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var users_entity_1 = require("@entity/users.entity");
var HttpException_1 = require("@exceptions/HttpException");
var util_1 = require("@utils/util");
var score_entity_1 = require("@/entity/score.entity");
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = users_entity_1.UserEntity;
        this.scores = score_entity_1.ScoreEntity;
    }
    UserService.prototype.findAllUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = (0, typeorm_1.getRepository)(this.users);
                        return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    UserService.prototype.findUserByMsisdn = function (msisdn) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, scoreRepository, findUser, user, createUserData, createScore, Score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, util_1.isEmpty)(msisdn))
                            throw new HttpException_1.HttpException(400, "You're not userId");
                        userRepository = (0, typeorm_1.getRepository)(this.users);
                        scoreRepository = (0, typeorm_1.getRepository)(this.scores);
                        return [4 /*yield*/, userRepository.findOne({ where: { msisdn: msisdn } })];
                    case 1:
                        findUser = _a.sent();
                        if (!!findUser) return [3 /*break*/, 4];
                        user = {
                            msisdn: msisdn
                        };
                        return [4 /*yield*/, userRepository.save(userRepository.create(user))];
                    case 2:
                        createUserData = _a.sent();
                        return [4 /*yield*/, scoreRepository.save(scoreRepository.create({ user: createUserData }))];
                    case 3:
                        createScore = _a.sent();
                        return [2 /*return*/, createScore];
                    case 4:
                        if (!findUser) return [3 /*break*/, 6];
                        return [4 /*yield*/, scoreRepository.findOne({ where: { user: findUser.id } })];
                    case 5:
                        Score = _a.sent();
                        return [2 /*return*/, Score];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createUserOnActivity = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, scoreRepository, findUser, Score, updatedScore, createUserData, newUser, createScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, util_1.isEmpty)(userData))
                            throw new HttpException_1.HttpException(400, "Invalid User Data");
                        if (userData.diamonds == null || userData.action == null) {
                            throw new HttpException_1.HttpException(409, "Invalid properties");
                        }
                        if (userData.action != "add") {
                            throw new HttpException_1.HttpException(409, "Invalid action");
                        }
                        console.log("Create User Service Called !!");
                        userRepository = (0, typeorm_1.getRepository)(this.users);
                        scoreRepository = (0, typeorm_1.getRepository)(this.scores);
                        return [4 /*yield*/, userRepository.findOne({ where: { msisdn: userData.msisdn } })];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser) return [3 /*break*/, 5];
                        return [4 /*yield*/, scoreRepository.findOne({ where: { user: findUser } })];
                    case 2:
                        Score = _a.sent();
                        return [4 /*yield*/, scoreRepository.update(Score.sid, { quantity: Score.quantity + userData.diamonds })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, scoreRepository.findOne({ where: { user: findUser } })];
                    case 4:
                        updatedScore = _a.sent();
                        throw new HttpException_1.HttpException(409, "msisdn ".concat(userData.msisdn, " already exists , and have diamonds ").concat(updatedScore.quantity, " now"));
                    case 5: return [4 /*yield*/, userRepository.save(userRepository.create(userData))];
                    case 6:
                        createUserData = _a.sent();
                        newUser = {
                            user: createUserData,
                            quantity: userData.diamonds
                        };
                        return [4 /*yield*/, scoreRepository.save(newUser)];
                    case 7:
                        createScore = _a.sent();
                        userRepository.create(userData);
                        return [2 /*return*/, createUserData];
                }
            });
        });
    };
    UserService.prototype.playGame = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, scoreRepository, findUser, Score, updatedScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((0, util_1.isEmpty)(userData))
                            throw new HttpException_1.HttpException(400, "Invalid User Data");
                        if (userData.diamonds == null || userData.action == null) {
                            throw new HttpException_1.HttpException(409, "Invalid properties");
                        }
                        if (userData.action != "remove") {
                            throw new HttpException_1.HttpException(409, "Invalid action");
                        }
                        userRepository = (0, typeorm_1.getRepository)(this.users);
                        scoreRepository = (0, typeorm_1.getRepository)(this.scores);
                        return [4 /*yield*/, userRepository.findOne({ where: { msisdn: userData.msisdn } })];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser) {
                            throw new HttpException_1.HttpException(409, "User with msisdn ".concat(userData.msisdn, " does not exist"));
                        }
                        return [4 /*yield*/, scoreRepository.findOne({ where: { user: findUser } })];
                    case 2:
                        Score = _a.sent();
                        return [4 /*yield*/, scoreRepository.update(Score.sid, { quantity: Score.quantity - userData.diamonds })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, scoreRepository.findOne({ where: { user: findUser } })];
                    case 4:
                        updatedScore = _a.sent();
                        return [2 /*return*/, updatedScore];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = UserService;
//# sourceMappingURL=users.service.js.map