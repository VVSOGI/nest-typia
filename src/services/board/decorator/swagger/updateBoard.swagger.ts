import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

class UpdateBoardBody {
  @ApiProperty({
    example: `I'm test board`,
    description: `Write a title that the board you want to update`,
  })
  title: string;

  @ApiProperty({
    example: `I'm test description`,
    description: `Write a description that the board you want to update`,
  })
  description: string;
}

export function SwaggerUpdateBoard() {
  return applyDecorators(
    ApiParam({
      name: 'id',
      schema: {
        type: 'uuid',
        example: 'd2e9caa5-79ab-4ffb-b5ec-0420cf3f9d83',
      },
    }),
    ApiBody({
      type: UpdateBoardBody,
      description: 'Update board body',
    }),
    ApiResponse({
      status: 400,
      description: 'Receive unexpected data or bad request',
      example: `{
        "title": "I'm test board",
        "description": null
      }`,
    }),
    ApiResponse({
      status: 406,
      description: 'Unexpected data and need error handle of this problem',
    }),
    ApiResponse({
      status: 200,
      description: 'Success!',
    }),
  );
}
