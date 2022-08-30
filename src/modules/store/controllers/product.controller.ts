import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity";
import { Result } from "../../../modules/backoffice/models/result-model";

@Controller('v1/products')
export class ProductController{
    constructor(private readonly service:ProductService){}

    @Get()
    async get(){
        try{
            const products = await this.service.get();
            return new Result(null, true, products, null)
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível listar os produtos.', false, error, null), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body()model: Product){
        try{
            await this.service.post(model);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível incluir o produto.', false, error, null), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body()model: Product){
        try{
            await this.service.put(id, model);
            return new Result(null, true, model, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível alterar os produtos.', false, null, null), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id){
        try{
            await this.service.delete(id);
            return new Result('Registro excluido com sucesso.', true, null, null);
        }
        catch(error){
            throw new HttpException(new Result('Não foi possível excluir o produtos.', false, null, null), HttpStatus.BAD_REQUEST);
        }
    }
}