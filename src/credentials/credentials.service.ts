import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/credential.entity';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepository: Repository<Credential>,
  ) {}

  async create(createCredentialDto: CreateCredentialDto): Promise<Credential> {
    const newCredential = this.credentialRepository.create(createCredentialDto);
    return this.credentialRepository.save(newCredential);
  }

  async findAll(): Promise<Credential[]> {
    return this.credentialRepository.find();
  }

  async findOne(id: number): Promise<Credential> {
    const credential = await this.credentialRepository.findOne({ where: { id }});
    if (credential === null) {
      throw new Error();
    }
    return this.credentialRepository.findOne({ where: { id }});
  }

  async update(id: number, updateCredentialDto: UpdateCredentialDto): Promise<Credential> {
    await this.credentialRepository.update(id, updateCredentialDto);
    return this.credentialRepository.findOne({ where: { id }});
  }

  async remove(id: number): Promise<Credential> {
    const deletedCredential = await this.credentialRepository.findOne({ where: { id }});
    await this.credentialRepository.delete(id);
    return deletedCredential;
  }
}
