import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return await this.remindersService.create(createReminderDto);
  }

  @Get()
  async findAll() {
    return await this.remindersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.remindersService.findOne(+id);
    } catch(err) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDto) {
    return await this.remindersService.update(+id, updateReminderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.remindersService.remove(+id);
  }
}
