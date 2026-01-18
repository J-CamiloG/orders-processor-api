import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Prisma Test') 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @ApiOperation({ summary: 'Prueba de conexión con Prisma' })
  @ApiResponse({
    status: 200,
    description: 'Retorna conteo y muestra registros de external_orders',
    schema: {
      example: {
        success: true,
        message: 'Prisma está funcionando ',
        data: { count: 0, sample: [] },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error al conectar con Prisma',
    schema: {
      example: {
        success: false,
        message: 'Error al conectar con Prisma ',
        error: 'Detalles del error',
      },
    },
  })
  async testDatabase() {
    try {
      const result = await this.appService.testPrisma();
      return {
        success: true,
        message: 'Prisma está funcionando ',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al conectar con Prisma ',
        error: error instanceof Error ? error.message : error,
      };
    }
  }
}
