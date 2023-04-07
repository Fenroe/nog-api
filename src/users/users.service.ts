import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { username, password } = signInDto;
    const user = await this.findOneByUsername(username);
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (user === null) {
      throw new NotFoundException();
    } 
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username }});
    if (user === null) {
      throw new Error();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id }});
  }

  async remove(id: number): Promise<User> {
    const deletedUser = this.userRepository.findOne({ where: { id }});
    await this.userRepository.delete(id);
    return deletedUser;
  }
}
