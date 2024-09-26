import typia from 'typia';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TypiaExceptionHandler } from 'src/common';
import { CreateBoardValidator } from '../validator';

export interface CreateBoardDto {
  title: string;
  description: string;
}

export interface CreateRequest {
  body: CreateBoardDto | any;
}

export const CreateBoard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<CreateRequest>();
    const result = new CreateBoardValidator(request).validate();

    if (typia.is<typia.IValidation.IError>(result)) {
      const exceptionHandler = new TypiaExceptionHandler(result);
      return exceptionHandler.handleValidationError();
    }

    return result;
  },
);
