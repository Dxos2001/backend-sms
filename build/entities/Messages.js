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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const typeorm_1 = require("typeorm");
const Campaigns_1 = require("./Campaigns");
let Messages = class Messages {
};
exports.Messages = Messages;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Messages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "campaign_id", nullable: true }),
    __metadata("design:type", Object)
], Messages.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "phone", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Messages.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "text", nullable: true, length: 500 }),
    __metadata("design:type", Object)
], Messages.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "shipping_status", nullable: true }),
    __metadata("design:type", Object)
], Messages.prototype, "shippingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "process_date", nullable: true }),
    __metadata("design:type", Object)
], Messages.prototype, "processDate", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "process_hour", nullable: true }),
    __metadata("design:type", Object)
], Messages.prototype, "processHour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Campaigns_1.Campaigns, (campaigns) => campaigns.messages, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "campaign_id", referencedColumnName: "id" }]),
    __metadata("design:type", Object)
], Messages.prototype, "campaign", void 0);
exports.Messages = Messages = __decorate([
    (0, typeorm_1.Index)("fk_campaign", ["campaignId"], {}),
    (0, typeorm_1.Entity)("messages")
], Messages);
