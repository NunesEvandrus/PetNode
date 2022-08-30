import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { CreatePetsContract } from "../contracts/pet/create-pets-contract";
import { Pet } from "../models/pet-model";
import { Result } from "../models/result-model";
import { PetService } from "../services/pet.service";

@Controller('v1/pets')
export class PetController{
    constructor(private readonly service: PetService){   
    }
    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async createPet(@Param('document') document, @Body() model : Pet){
        try{
            const res =  await this.service.create(document,model);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetsContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model){
        try{
            const res =  await this.service.update(document,id, model);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível realizar a operação', false, null, error), HttpStatus.BAD_REQUEST);
        }
        
    }
}