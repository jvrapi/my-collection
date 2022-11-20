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
exports.CreateUserUseCase = void 0;
const typedi_1 = require("typedi");
const Error_1 = require("../../../errors/Error");
let CreateUserUseCase = class CreateUserUseCase {
    constructor(usersRepository, passwordProvider) {
        this.usersRepository = usersRepository;
        this.passwordProvider = passwordProvider;
    }
    async execute({ name, email, password, username }) {
        const userAlreadyExists = await this.usersRepository.findByEmailOrUsername(email, username);
        if (userAlreadyExists) {
            throw new Error_1.ApiError('Users already exists!');
        }
        const passwordHashed = await this.passwordProvider.hashPassword(password);
        const userCreated = await this.usersRepository.create({
            email,
            name,
            password: passwordHashed,
            username
        });
        delete userCreated.password;
        return userCreated;
    }
};
CreateUserUseCase = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('usersRepository')),
    __param(1, (0, typedi_1.Inject)('bcryptProvider')),
    __metadata("design:paramtypes", [Object, Object])
], CreateUserUseCase);
exports.CreateUserUseCase = CreateUserUseCase;
