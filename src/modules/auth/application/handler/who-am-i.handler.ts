import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { WhoAmIQuery } from "../../domain/queries/who-am-i.query";

@QueryHandler(WhoAmIQuery)
export class WhoAmIHandler implements IQueryHandler<WhoAmIQuery> {
    constructor() {}

    async execute(query: WhoAmIQuery) {
        return query.user
    }
}
