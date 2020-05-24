export interface Seeker {
}
import { User } from './user';

export interface Seeker extends User
{
    address?: String,
    city?: String,
    seniority?: String, 
    expYears?: Number,
    currentJob?: String,
    currentSalary?: Number,
    expectedSalary?: Number,
    cv?: String
}
