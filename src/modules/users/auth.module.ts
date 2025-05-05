import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PostgresService } from 'src/database';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PostgresService],
})
export class authModule {}
