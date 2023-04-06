import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CreateCredentialDto } from 'src/credentials/dto/create-credential.dto';
import { UpdateCredentialDto } from 'src/credentials/dto/update-credential.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private credentialsService: CredentialsService
  ) {}

  async create(createUserDto: CreateUserDto, createCredentialDto: CreateCredentialDto): Promise<User> {
    const newCredentials = await this.credentialsService.create(createCredentialDto);
    const newUser = this.userRepository.create(createUserDto);
    newUser.credentials = newCredentials;
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (user === null) {
      throw new Error();
    } 
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id }});
  }

  async updateCredentials(id: number, updateCredentialDto: UpdateCredentialDto): Promise<void> {
    const updatedCredentialsId = await this.userRepository.findOne({ where: { id }});
    await this.credentialsService.update(updatedCredentialsId.credentials.id, updateCredentialDto);
  }

  async remove(id: number): Promise<User> {
    const deletedUser = this.userRepository.findOne({ where: { id }});
    await this.credentialsService.remove(id);
    await this.userRepository.delete(id);
    return deletedUser;
  }
}
