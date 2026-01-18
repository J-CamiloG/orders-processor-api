import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma conectado');
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  }

  async onModuleDestroy() {
  try {
    await this.$disconnect();
    console.log('Prisma desconectado');
  } catch (error) {
    console.error('Error al desconectar Prisma:', error.message);
  }
}
}