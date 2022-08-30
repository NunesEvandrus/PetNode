import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/customer/create-customer.dto';
import { Flunt } from '../../utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class CreateCustomerContract implements Contract{
    errors: any[];

    validate(model: CreateCustomerDto):boolean{
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome invalido');
        flunt.isEmail(model.email, 'Email invalido');
        flunt.isFixedLen(model.document, 11, 'Documento invalido');
        flunt.hasMinLen(model.password, 6, 'Senha invalida');

        this.errors = flunt.errors;
        return this.errors.length === 0;
    }
}