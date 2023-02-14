import {DB_User_Type} from "../db/db";

declare global {
    declare namespace Express {
        export interface Request {
            user: DB_User_Type | null | void
        }
    }
}