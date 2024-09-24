import typia from 'typia';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';

export interface CreateBoardDto {
  title: string;
  description: string;
}

export const CreateBoard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return validateCreateBoardRequest(request);
  },
);

export const validateCreateBoardRequest = (
  request: any,
): CreateBoardDto | HttpException => {
  const pattern = /\$input\./g;

  const checkValidate: typia.IValidation<CreateBoardDto> =
    typia.validateEquals<CreateBoardDto>(request.body);

  if (checkValidate.success) {
    return request.body;
  }

  checkValidate.errors.forEach((error) => {
    const { expected, value, path } = error;
    const NON_DTO_TYPE = expected === 'undefined';
    const MISSING_DATA = expected && !value;
    const INVALID_DATA_TYPE = typeof expected !== typeof value;

    if (NON_DTO_TYPE) {
      throw new BadRequestException(
        `Received unexpected data '${path.replace(pattern, '')}' [WRONG DATA SENT ERROR]`,
      );
    }

    if (MISSING_DATA) {
      throw new BadRequestException(
        `Received unexpected data '${path.replace(pattern, '')}' [MISSING DATA ERROR]`,
      );
    }

    if (INVALID_DATA_TYPE) {
      throw new BadRequestException(
        `Received unexpected data '${path.replace(pattern, '')}' [INVALID TYPE ERROR]`,
      );
    }
  });

  Logger.error(checkValidate.errors);
  Logger.error(`Not acceptable error [NOT ACCEPTABLE ERROR] [Create Board]`);
  throw new NotAcceptableException();
};
