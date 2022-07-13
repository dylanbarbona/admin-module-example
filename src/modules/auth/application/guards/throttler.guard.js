"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GqlThrottlerGuard = void 0;
var throttler_1 = require("@nestjs/throttler");
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var GqlThrottlerGuard = /** @class */ (function (_super) {
    __extends(GqlThrottlerGuard, _super);
    function GqlThrottlerGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GqlThrottlerGuard.prototype.getRequestResponse = function (context) {
        var gqlCtx = graphql_1.GqlExecutionContext.create(context);
        var ctx = gqlCtx.getContext();
        return { req: ctx.req, res: ctx.res };
    };
    GqlThrottlerGuard = __decorate([
        (0, common_1.Injectable)()
    ], GqlThrottlerGuard);
    return GqlThrottlerGuard;
}(throttler_1.ThrottlerGuard));
exports.GqlThrottlerGuard = GqlThrottlerGuard;
