import { Injectable } from '@nestjs/common';
import { Flunt } from '../utils/flunt';
import { Contract } from '../../../modules/backoffice/contracts/contract';
import { QueryDto } from '../../../modules/backoffice/dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
    errors: any[];

    validate(model: QueryDto): boolean {
        const flunt = new Flunt();

        if (!model.query)
            model.query = {};

        flunt.isGreaterThan(model.take, 1000, 'Sua query não pode retornar mais que 1000 registros');

        this.errors = flunt.errors;
        return flunt.isValid();
    }
}