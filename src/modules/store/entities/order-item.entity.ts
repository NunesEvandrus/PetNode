import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm'; 
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:Number;

    @ManyToOne(() => Order, (o) => o.items)
    order: Order;

    @ManyToOne(() => Product, (p) => p)
    product: Product;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
} 