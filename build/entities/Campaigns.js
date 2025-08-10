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
exports.Campaigns = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Messages_1 = require("./Messages");
let Campaigns = class Campaigns {
};
exports.Campaigns = Campaigns;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Campaigns.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "user_id", nullable: true }),
    __metadata("design:type", Object)
], Campaigns.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Campaigns.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "process_date", nullable: true }),
    __metadata("design:type", Object)
], Campaigns.prototype, "processDate", void 0);
__decorate([
    (0, typeorm_1.Column)("datetime", { name: "process_hour", nullable: true }),
    __metadata("design:type", Object)
], Campaigns.prototype, "processHour", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "process_status", nullable: true }),
    __metadata("design:type", Object)
], Campaigns.prototype, "processStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "phone_list", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Campaigns.prototype, "phoneList", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "message_text", nullable: true, length: 500 }),
    __metadata("design:type", Object)
], Campaigns.prototype, "messageText", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.campaigns, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Object)
], Campaigns.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Messages_1.Messages, (messages) => messages.campaign),
    __metadata("design:type", Array)
], Campaigns.prototype, "messages", void 0);
exports.Campaigns = Campaigns = __decorate([
    (0, typeorm_1.Index)("fk_users", ["userId"], {}),
    (0, typeorm_1.Entity)("campaigns")
], Campaigns);
