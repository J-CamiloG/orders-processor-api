import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async testPrisma() {
    const count = await this.prisma.external_orders.count();

    const sample = await this.prisma.external_orders.findMany({
      take: 5,
    });

    return { count, sample };
  }
}
