import typia from 'typia';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TypiaExceptionHandler } from 'src/common';
import { UpdateBoardValidator } from '../validator';

export interface UpdateBoardDto {
  title: string;
  description: string;
}

export interface UpdateRequest {
  body: UpdateBoardDto | any;
}

export const UpdateBoard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const result = new UpdateBoardValidator(request).validate();

    if (typia.is<typia.IValidation.IError>(result)) {
      const exceptionHandler = new TypiaExceptionHandler(result);
      return exceptionHandler.handleValidationError();
    }

    return result;
  },
);
