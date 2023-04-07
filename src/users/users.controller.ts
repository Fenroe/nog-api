import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateCredentialDto } from 'src/credentials/dto/update-credential.dto';
import { CreateCredentialDto } from 'src/credentials/dto/create-credential.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Body() createCredentialDto: CreateCredentialDto) {
    return await this.usersService.create(createUserDto, createCredentialDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(+id);
    } catch(err) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Put('/credentials/:id')
  async updateCredentials(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return await this.usersService.updateCredentials(+id, updateCredentialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
