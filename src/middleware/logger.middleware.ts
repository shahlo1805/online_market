import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void) {
        console.log(req.method);
        

        next()
        
    }
} 