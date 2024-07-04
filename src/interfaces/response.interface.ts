import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface ResponseInterface {
  status: status,
  data : object,
  pagination : object
}


export interface status {
    result:"Success" | "Failure",
    message:string,
    tokenExpired:boolean
}
