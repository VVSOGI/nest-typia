import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

class CreateBoard {
  @ApiProperty({
    example: `I'm test board`,
    description: `Decide on a title for the board you want to create`,
  })
  title: string;

  @ApiProperty({
    example: `I'm test description`,
    description: `Decide on a title for the description you want to create`,
  })
  description: string;
}

export function SwaggerCreateBoard() {
  return applyDecorators(
    ApiBody({
      type: CreateBoard,
      description: 'Create board',
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
      status: 201,
      description: 'Success!',
    }),
  );
}
