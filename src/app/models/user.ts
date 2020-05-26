export interface User {
    name?: String,
    email: String,
    password?: String,
    password_confirmation?: String,
    phone?: String,
    role?: any
    [key: string]: any
}
