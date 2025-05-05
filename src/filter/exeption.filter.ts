import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { error } from "console";
import { Request, Response } from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();


        response.status(exception.getStatus()).send({
            message: exception.message,
            statusCode: exception.getStatus(),
            error: exception.name,
            occuredAt: new Date().toDateString(),

        });
    }
}