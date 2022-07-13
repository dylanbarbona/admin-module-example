export interface AuthRepository {
    findOne(email: string)
    findById(id: number)
    create(first_name: string, last_name: string, email: string, password: string)
}
