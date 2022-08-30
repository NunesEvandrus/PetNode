import { NestInterceptor, Injectable, ExecutionContext, CallHandler, HttpException, HttpStatus} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ResultDto } from '../../modules/backoffice/dtos/result.dto'; 

@Injectable()
export class RoleInterceptor implements NestInterceptor {
    constructor(public roles: string[]){

    }
    intercept(context: ExecutionContext, next: CallHandler):
         Observable<any> {
            const user: JwtPayload = context.switchToHttp().getRequest().user;
            console.log(user);

            let hasHole = false;
            user.roles.forEach((role) =>{
                if (this.roles.includes(role))
                    hasHole = true;
            });
            if (!hasHole){
                throw new HttpException(
                    new ResultDto('Acesso não autorizado', false, null, null),
                    HttpStatus.FORBIDDEN);
            }

            return next.handle();
        
    }
}