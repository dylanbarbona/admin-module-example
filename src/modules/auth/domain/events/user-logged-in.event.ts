import { User } from "../entities/user.entity";

export class UserLoggedInEvent {
    constructor(public readonly user: User) {}
}
