"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var RegisterInput = /** @class */ (function () {
    function RegisterInput() {
    }
    __decorate([
        (0, graphql_1.Field)({ description: 'Nombre' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' })
    ], RegisterInput.prototype, "name");
    __decorate([
        (0, graphql_1.Field)({ description: 'Correo electrónico' }),
        (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es requerido' })
    ], RegisterInput.prototype, "email");
    __decorate([
        (0, graphql_1.Field)({ description: 'Contraseña' }),
        (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es requerida' })
    ], RegisterInput.prototype, "password");
    RegisterInput = __decorate([
        (0, graphql_1.InputType)()
    ], RegisterInput);
    return RegisterInput;
}());
exports.RegisterInput = RegisterInput;
