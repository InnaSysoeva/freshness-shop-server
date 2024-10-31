import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import errorMessages from "../common/constants/error.messages";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = this.extractTokenFromHeader(request);

    if (!accessToken) {
      throw new UnauthorizedException(errorMessages.unauthorized());
    }

    try {
      const decodedUser = this.jwtService.verify(accessToken);
      request["user"] = decodedUser;
    } catch (error) {
      throw new UnauthorizedException(errorMessages.unauthorized());
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
