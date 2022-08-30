import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { Address } from "../models/address-model";
import { Result } from "../models/result-model";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer-contract";

@Controller('v1/addresses')
export class AddressController{
    constructor(private readonly service: AddressService){   
    }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async addBillingAdress(@Param('document') document, @Body() model : Address){
        try{
            const res =  await this.service.create(document,model, AddressType.Billing);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    //@UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async addShippingAdress(@Param('document') document, @Body() model : Address){
        try{
            const res =  await this.service.create(document,model, AddressType.shipping);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}