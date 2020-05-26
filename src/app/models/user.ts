export interface User {
    id?: String,
    name?: String,
    email: String,
    password?: String,
    password_confirmation?: String,
    phone?: String,
    [key: string]: any
}
