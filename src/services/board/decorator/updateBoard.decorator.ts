import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface UpdateBoardDto {
  title: string;
  description: string;
}

export const UpdateBoard = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.body;
  },
);
