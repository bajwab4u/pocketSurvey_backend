import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entity/users.entity';
import { TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
declare class AuthService {
    users: typeof UserEntity;
    signup(userData: CreateUserDto): Promise<User>;
    login(userData: CreateUserDto): Promise<{
        cookie: string;
        token: TokenData;
    }>;
    logout(userData: User): Promise<User>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default AuthService;
