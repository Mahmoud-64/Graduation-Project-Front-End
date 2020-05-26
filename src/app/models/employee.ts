import { User } from './user';

export interface Employee extends User
{
    position?: String,
    branch?: String,
}
