export interface AuthRepository {
    findOne(email: string)
    findById(id: number)
    create(name: string, email: string, password: string)
}
