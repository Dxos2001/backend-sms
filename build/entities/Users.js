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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Campaigns_1 = require("./Campaigns");
const Customers_1 = require("./Customers");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "customer_id", nullable: true }),
    __metadata("design:type", Object)
], Users.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "username", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)("tinyint", { name: "status", nullable: true, width: 1 }),
    __metadata("design:type", Object)
], Users.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Campaigns_1.Campaigns, (campaigns) => campaigns.user),
    __metadata("design:type", Array)
], Users.prototype, "campaigns", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customers_1.Customers, (customers) => customers.users, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "customer_id", referencedColumnName: "id" }]),
    __metadata("design:type", Object)
], Users.prototype, "customer", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)("fk_customers", ["customer_id"], {}),
    (0, typeorm_1.Entity)("users")
], Users);
