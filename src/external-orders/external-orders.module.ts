import { Module } from '@nestjs/common';
import { ExternalOrdersController } from './external-orders.controller';
import { ExternalOrdersService } from './external-orders.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ExternalOrdersController],
  providers: [ExternalOrdersService, PrismaService],
})
export class ExternalOrdersModule {}
