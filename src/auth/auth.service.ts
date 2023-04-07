import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        ) {}

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        const hashedPassword = user.password;
        const isCorrect = await bcrypt.compare(password, hashedPassword);
        if (!isCorrect) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
    
}
