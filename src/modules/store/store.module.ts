import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../modules/store/entities/product.entity';
import { ProductService } from '../../modules/store/services/product.service';
import { ProductController } from '../../modules/store/controllers/product.controller';
import { Order } from '../../modules/store/entities/order.entity';
import { OrderItem } from '../../modules/store/entities/order-item.entity';
import { OrderService } from '../../modules/store/services/order.service';
import { OrderController } from '../../modules/store/controllers/order.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        Product,
        Order,
        OrderItem
    ])],
    providers: [
        ProductService,
        OrderService,
        OrderItemService
    ],
    controllers: [
        ProductController,
        OrderController
    ],
})
export class StoreModule { }