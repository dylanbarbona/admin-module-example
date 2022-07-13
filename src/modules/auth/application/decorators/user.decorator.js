"use strict";
exports.__esModule = true;
exports.CurrentUser = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    var gqlCtx = graphql_1.GqlExecutionContext.create(ctx);
    var request = gqlCtx.getContext().req;
    return request.user;
});
