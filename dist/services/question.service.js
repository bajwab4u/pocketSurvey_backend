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
var question_entity_1 = require("@entity/question.entity");
var questionOption_entity_1 = require("@entity/questionOption.entity");
var typeorm_1 = require("typeorm");
var HttpException_1 = require("@exceptions/HttpException");
var QuestionService = /** @class */ (function () {
    function QuestionService() {
        this.question = question_entity_1.QuestionEntity;
        this.option = questionOption_entity_1.QuestionOptionEntity;
    }
    QuestionService.prototype.createQuestion = function (questionData) {
        return __awaiter(this, void 0, void 0, function () {
            var questionRepository, questionOptionsRepository, createQuestionData, options, createOptionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionRepository = (0, typeorm_1.getRepository)(this.question);
                        questionOptionsRepository = (0, typeorm_1.getRepository)(this.option);
                        return [4 /*yield*/, questionRepository.save(questionData)];
                    case 1:
                        createQuestionData = _a.sent();
                        options = {
                            question: createQuestionData,
                            correctAnswer: questionData.correctAnswer,
                            options: questionData.options
                        };
                        return [4 /*yield*/, questionOptionsRepository.save(options)];
                    case 2:
                        createOptionData = _a.sent();
                        return [2 /*return*/, createQuestionData];
                }
            });
        });
    };
    QuestionService.prototype.generateQuestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questionRepository, createQuestionData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionRepository = (0, typeorm_1.getRepository)(this.question);
                        return [4 /*yield*/, questionRepository
                                .createQueryBuilder()
                                .where({ level: 'hard' })
                                .andWhere({ isActive: true })
                                .orderBy('RANDOM()')
                                .getOne()];
                    case 1:
                        createQuestionData = _a.sent();
                        if (!createQuestionData)
                            throw new HttpException_1.HttpException(409, 'Question Not Generated');
                        return [2 /*return*/, createQuestionData];
                }
            });
        });
    };
    QuestionService.prototype.generateOptions = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var questionOptionsRepository, generatedOptionsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionOptionsRepository = (0, typeorm_1.getRepository)(this.option);
                        return [4 /*yield*/, questionOptionsRepository.createQueryBuilder('option').where({ question: question }).getOne()];
                    case 1:
                        generatedOptionsData = _a.sent();
                        if (!generatedOptionsData)
                            throw new HttpException_1.HttpException(409, 'Question Options are not Generated');
                        return [2 /*return*/, generatedOptionsData];
                }
            });
        });
    };
    QuestionService.prototype.checkAnswer = function (answer) {
        return __awaiter(this, void 0, void 0, function () {
            var questionOptionsRepository, generatedOptionsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questionOptionsRepository = (0, typeorm_1.getRepository)(this.option);
                        return [4 /*yield*/, questionOptionsRepository.createQueryBuilder('option').where({ oId: answer.oId }).getOne()];
                    case 1:
                        generatedOptionsData = _a.sent();
                        if (!generatedOptionsData)
                            throw new HttpException_1.HttpException(409, 'Question Does not exist');
                        if (generatedOptionsData.correctAnswer == answer.option) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return QuestionService;
}());
exports["default"] = QuestionService;
//# sourceMappingURL=question.service.js.map