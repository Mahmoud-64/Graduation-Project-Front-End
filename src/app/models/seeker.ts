
import { User } from './user';

export interface Seeker
{
    address?: String,
    city?: String,
    seniority?: String,
    expYears?: Number,
    currentJob?: String,
    currentSalary?: Number,
    expectedSalary?: Number,
    cv?: String,
    isVerified?: Number,
    contacts?: [],
    [key: string]: any
}
