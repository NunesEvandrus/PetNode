import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { CreditCard } from '../../models/credit-card-model';
import { Flunt } from '../../utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class CreateCreditCardContract implements Contract{
    errors: any[];

    validate(model: CreditCard):boolean{
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 5, 'Nome no cartão invalido');
        flunt.isFixedLen(model.number, 16, 'Numero no cartão invalido');
        flunt.hasMinLen(model.expiration, 4, 'Data de expiração do cartão invalido');

        this.errors = flunt.errors;
        return this.errors.length === 0;
    }
}