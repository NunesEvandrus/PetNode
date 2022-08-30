import {Controller, Get, UseGuards, Post, Req, UseInterceptors, Body, HttpException, HttpStatus} from "@nestjs/common";
import { JwtAuthGuard } from "../../../shared/guards/auth.guard";
import { RoleInterceptor } from "../../../shared/interceptors/role.interceptor";
import { AuthService } from "../../../shared/services/auth.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { ResultDto } from "../dtos/result.dto";
import { AccountService } from "../services/account.service";
import { Guid } from "guid-typescript";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";

@Controller('v1/accounts')
export class AccountController{
    constructor(private authService: AuthService,
                private accountService: AccountService){

    }

    // Autenticar
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        // Caso não encontre o usuário
        if (!customer)
            throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        // Caso o usuário esteja inativo
        if (!customer.user.active)
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // Gera o token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        return new ResultDto(null, true, token, null);
    }

    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any>{
        try{
            //TODO: Enviar email com senha

            const password = Guid.create().toString().substring(0,8).replace('-', '');
            await this.accountService.update(model.document, {password: password});
            return new ResultDto('Uma nova senha foi enviada para seu E-mail', true, null, null)
        }catch(error)
        {
            throw new HttpException(new ResultDto('Não foi possível restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: Encriptar senha
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new ResultDto('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    // Refresh Token
    @Post('refresh')
    async refreshToken(@Req() request): Promise<any> {
        // Gera o token
        const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.roles);
        return new ResultDto(null, true, token, null);
    }


    
}