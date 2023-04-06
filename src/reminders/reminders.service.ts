import { Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { Reminder } from './entities/reminder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<Reminder> {
    const newReminder = this.reminderRepository.create(createReminderDto)
    return this.reminderRepository.save(newReminder)
  }

  async findAll(): Promise<Reminder[]> {
    return this.reminderRepository.find();
  }

  async findOne(id: number): Promise<Reminder> {
    const reminder = await this.reminderRepository.findOne({ where: { id } });
    if (reminder === null) {
      throw new Error();
    }
    return reminder;
  }

  async update(id: number, updateReminderDto: UpdateReminderDto): Promise<Reminder> {
    await this.reminderRepository.update(id, updateReminderDto)
    return this.reminderRepository.findOne({ where: { id }})
  }

  async remove(id: number): Promise<Reminder> {
    const deletedReminder = await this.reminderRepository.findOne({ where: { id }});
    await this.reminderRepository.delete(id);
    return deletedReminder;
  }
}
