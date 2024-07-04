"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.QuestionOptionEntity = void 0;
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var question_entity_1 = require("./question.entity");
var QuestionOptionEntity = /** @class */ (function () {
    function QuestionOptionEntity() {
    }
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return question_entity_1.QuestionEntity; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", question_entity_1.QuestionEntity)
    ], QuestionOptionEntity.prototype, "question");
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], QuestionOptionEntity.prototype, "oId");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], QuestionOptionEntity.prototype, "correctAnswer");
    __decorate([
        (0, typeorm_1.Column)('text', { array: true }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], QuestionOptionEntity.prototype, "options");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], QuestionOptionEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], QuestionOptionEntity.prototype, "updatedAt");
    QuestionOptionEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], QuestionOptionEntity);
    return QuestionOptionEntity;
}());
exports.QuestionOptionEntity = QuestionOptionEntity;
//# sourceMappingURL=questionOption.entity.js.map