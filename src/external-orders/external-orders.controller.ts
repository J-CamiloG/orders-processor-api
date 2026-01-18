import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExternalOrdersService } from './external-orders.service';
import { CreateExternalOrderDto } from '../external-orders/dto/create-external-order.dto';

@ApiTags('External Orders')
@Controller('external/orders')
export class ExternalOrdersController {
  constructor(
    private readonly externalOrdersService: ExternalOrdersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Recibe una orden desde Laravel' })
  @ApiResponse({ status: 201, description: 'Orden procesada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() dto: CreateExternalOrderDto) {
    return this.externalOrdersService.processOrder(dto);
  }

  @Get(':orderNumber')
  @ApiOperation({ summary: 'Consultar estado de una orden externa' })
  @ApiResponse({ status: 200, description: 'Orden encontrada' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  async findOne(@Param('orderNumber') orderNumber: string) {
    const order = await this.externalOrdersService.findByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
