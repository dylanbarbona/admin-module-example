"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var LoginInput = /** @class */ (function () {
    function LoginInput() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: 'Correo electrónico' }),
        (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
        (0, class_validator_1.IsString)({ message: 'El correo electrónico debe ser una cadena de texto' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico no puede estar vacío' }),
        (0, class_validator_1.MaxLength)(50, { message: 'El correo electrónico no puede tener más de 50 caracteres' })
    ], LoginInput.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ description: 'Contraseña' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña no puede estar vacía' }),
        (0, class_validator_1.IsString)({ message: 'La contraseña debe ser un texto' }),
        (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
        (0, class_validator_1.MaxLength)(50, { message: 'La contraseña no puede tener más de 50 caracteres' })
    ], LoginInput.prototype, "password");
    LoginInput = __decorate([
        (0, graphql_1.InputType)()
    ], LoginInput);
    return LoginInput;
}());
exports.LoginInput = LoginInput;
