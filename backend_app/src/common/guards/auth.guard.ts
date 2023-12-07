import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException(`Invalid Token`);

    try {

      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET
      });

      request['user'] = payload;

    } catch (e){
      throw new UnauthorizedException(`Invalid Token`);
    }
    return true;
  }

  private extractTokenFromHeader (request: Request): string | undefined {
    
    if (!request.headers.authorization) return undefined;

    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

}