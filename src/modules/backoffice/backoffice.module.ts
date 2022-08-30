import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { AddressController } from './controllers/address.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';
import { PassportModule} from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../shared/services/auth.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { AccountController } from './controllers/account.controller';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secretOrPrivateKey: 'xpto12349k8j7h',
            signOptions:{
                expiresIn: 3600
            },
        }),
        MongooseModule.forFeature([
            {
                name:  'Customer',
                schema: CustomerSchema,
            },
            {
                name: 'User',
                schema: UserSchema,
            },
    ])],
    controllers: [AccountController, AddressController, CustomerController, PetController],
    providers:[AccountService, CustomerService, AddressService, PetService, AuthService, JwtStrategy],
})
export class BackofficeModule {}
