import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import {
  ValidateUpdateDTO,
  ValidateCreateDTO,
  SwaggerCreateBoard,
  SwaggerUpdateBoard,
} from './decorator';
import { CreateBoardDto, UpdateBoardDto } from './types';

@ApiTags('BOARD')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @SwaggerCreateBoard()
  async createBoard(@ValidateCreateDTO() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get()
  async getAllBoard() {
    return this.boardService.getAllBoard();
  }

  @Patch('/:id')
  @SwaggerUpdateBoard()
  async updateBoard(
    @Param('id') id: string,
    @ValidateUpdateDTO() updateBoard: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard({ id, ...updateBoard });
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: string) {
    return this.boardService.deleteBoard(id);
  }
}
