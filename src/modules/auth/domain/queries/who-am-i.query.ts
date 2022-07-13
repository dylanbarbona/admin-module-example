import { User } from "../entities/user.entity";

export class WhoAmIQuery {
    constructor(public user: User) {}
}
