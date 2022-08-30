import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../../dtos/customer/update-customer.dto';
import { Flunt } from '../../utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class UpdateCustomerContract implements Contract{
    errors: any[];

    validate(model: UpdateCustomerDto):boolean{
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 5, 'Nome invalido');

        this.errors = flunt.errors;
        return this.errors.length === 0;
    }
}