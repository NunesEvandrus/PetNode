import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './modules/store/store.module';
import { MongooseModule} from '@nestjs/mongoose';


@Module({
  imports: [BackofficeModule, StoreModule,
  MongooseModule.forRoot('mongodb://homolog:9TyTagurI7RhlKAxHkq7@10.100.1.159:27017/Desenv?authSource=admin'),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '9K8J7H6G',
    database: '7180',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  BackofficeModule,
],
  
})
export class AppModule {}
