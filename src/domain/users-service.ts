import {ObjectId} from "mongodb";

export type DB_User_Type = {
    _id: ObjectId,
    id: string,
    login: string,
    password: string,
    email: string

}
export const usersService = {
    async createUser(login:string, password:string, email:string){
        const user: DB_User_Type = {

        }
    }
}