import { ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Logger, Catch } from "@nestjs/common";
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger
  ) {

  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getRequest<Request>()
    const req = ctx.getResponse<Response>()

    const status = exception.getStatus()

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`Internal server error occured`)
    }

    req.status(status)
      .json(exception.getResponse())
  }
}