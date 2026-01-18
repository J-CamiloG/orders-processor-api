import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateExternalOrderDto } from '../external-orders/dto/create-external-order.dto';

@Injectable()
export class ExternalOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async processOrder(dto: CreateExternalOrderDto) {

    const order = await this.prisma.external_orders.create({
      data: {
        order_number: dto.order_number,
        customer: dto.customer,
        product: dto.product,
        quantity: dto.quantity,
        status: 'processing',
      },
    });

  
    await this.prisma.processing_logs.create({
      data: {
        external_order_id: order.id,
        level: 'info',
        message: 'Orden recibida y procesamiento iniciado',
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedOrder = await this.prisma.external_orders.update({
      where: { id: order.id },
      data: {
        status: 'completed',
        processed_at: new Date(),
      },
    });

    await this.prisma.processing_logs.create({
      data: {
        external_order_id: order.id,
        level: 'success',
        message: 'Orden procesada con éxito',
      },
    });

    return {
      success: true,
      order_number: updatedOrder.order_number,
      status: updatedOrder.status,
    };
  }

  async findByOrderNumber(orderNumber: string) {
    const order = await this.prisma.external_orders.findFirst({
      where: { order_number: orderNumber },
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }
}
