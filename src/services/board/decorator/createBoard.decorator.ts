import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import typia from 'typia';

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

      if (NON_DTO_TYPE)
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [WRONG DATA SENT ERROR]`,
        );

      if (MISSING_DATA)
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [MISSING DATA ERROR]`,
        );

      if (INVALID_DATA_TYPE)
        throw new BadRequestException(
          `Received unexpected data '${path.replace(pattern, '')}' [INVALID TYPE ERROR]`,
        );
    });
  },
);
