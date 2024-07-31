import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }
}
