import { User } from '@interfaces/users.interface';
export declare class UserEntity implements User {
    msisdn: string;
    id: number;
    email: string;
    password: string;
    jsId: string;
    status: string;
    fname: string;
    lname: string;
    createdAt: Date;
    updatedAt: Date;
    setStatus(): Promise<void>;
}
