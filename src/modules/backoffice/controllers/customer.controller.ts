import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { CreateCreditCardContract } from "../contracts/customer/create-creditcard-contract";
import { CreateCustomerContract } from "../contracts/customer/create-customer-contract";
import { UpdateCustomerContract } from "../contracts/customer/update-customer-contract";
import { QueryContract } from "../contracts/query.contracts";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { QueryDto } from "../dtos/query.dto";
import { CreditCard } from "../models/credit-card-model";
import { Customer } from "../models/customer-model";
import { Result } from "../models/result-model";
import { User } from "../models/user-model";
import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";

@Controller('v1/customers')
export class CustomerController{
    constructor(private readonly accountService: AccountService,
                private readonly customerService: CustomerService){   
    }

    @Get()
    async getAll(){
        const customers = await this.customerService.findAll();
        return new Result(null, true, customers, null);

    }
    @Get(':document')
    async getById(@Param('document') document){
        const customer = await this.customerService.find(document);
        return new Result(null, true, customer, null);

    }
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model : CreateCustomerDto){
        try{
            const user = await this.accountService.create(
                new User(model.document, model.password, true, ['user']),
            );
            const customer = new Customer(model.name, model.document, model.email, null, null, null, null, user);
            const res = await this.customerService.create(customer);
            return new Result('Client criado com sucesso!', true, res, null);

        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto){
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }

    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document, @Body() model : CreditCard){
        try{
            await this.customerService.saveOrUpdateCreditCard(document, model);
            return new Result(null, true, model,null );
            
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model : UpdateCustomerDto){
        try{
            await this.customerService.update(document, model);
            return new Result(null, true, model,null );
            
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':document')
    delete(@Param('document') document){
        return new Result('Cliente excluido com sucesso',true, null, null);
    }
    
    


}