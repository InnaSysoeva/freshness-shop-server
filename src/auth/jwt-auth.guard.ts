import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import errorMessages from "../common/constants/error.messages";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const token = authHeader.split("")[1];

      if (!token) {
        throw new UnauthorizedException(errorMessages.unauthorized());
      }

      const decodedUser = this.jwtService.verify(token);
      request.user = decodedUser;

      return true;
    } catch (error) {
      throw new UnauthorizedException(errorMessages.unauthorized());
    }
  }
}
