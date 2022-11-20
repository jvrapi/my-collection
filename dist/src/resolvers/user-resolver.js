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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const create_user_input_1 = require("../dtos/inputs/create-user-input");
const users_model_1 = require("../dtos/models/users-model");
const create_user_use_case_1 = require("../modules/users/use-cases/create-user-use-case");
let UserResolver = class UserResolver {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async users() {
        return 'Hello world';
    }
    async createUser(data) {
        return await this.createUserUseCase.execute(data);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => users_model_1.User),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    (0, typedi_1.Service)(),
    (0, type_graphql_1.Resolver)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase])
], UserResolver);
exports.UserResolver = UserResolver;
