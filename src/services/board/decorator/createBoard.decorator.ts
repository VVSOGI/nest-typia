import typia from 'typia';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';

export interface CreateBoardDto {
  title: string;
  description: string;
}

export const CreateBoard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const pattern = /\$input\./g;
    const request = ctx.switchToHttp().getRequest();
    const res: typia.IValidation<CreateBoardDto> =
      typia.validateEquals<CreateBoardDto>(request.body);

    if (res.success) {
      return request.body;
    }

    res.errors.forEach((error) => {
      const { expected, value, path } = error;
      const NON_DTO_TYPE = expected === 'undefined';
      const MISSING_DATA = expected && !value;
      const INVALID_DATA_TYPE = typeof expected !== typeof value;

      if (NON_DTO_TYPE) {
        Logger.error(
          `Received unexpected data '${path.replace(pattern, '')}' [WRONG DATA SENT ERROR] [Create Board]`,
        );
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [WRONG DATA SENT ERROR]`,
        );
      }

      if (MISSING_DATA) {
        Logger.error(
          `Received unexpected data '${path.replace(pattern, '')}' [MISSING DATA ERROR] [Create Board]`,
        );
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [MISSING DATA ERROR]`,
        );
      }

      if (INVALID_DATA_TYPE) {
        Logger.error(
          `Received unexpected data '${path.replace(pattern, '')}' [INVALID TYPE ERROR] [Create Board]`,
        );
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [INVALID TYPE ERROR]`,
        );
      }
    });

    Logger.error(res.errors);
    Logger.error(`Not acceptable error [NOT ACCEPTABLE ERROR] [Create Board]`);
    throw new NotAcceptableException();
  },
);
