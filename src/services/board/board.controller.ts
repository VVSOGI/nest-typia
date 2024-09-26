import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoard, SwaggerCreateBoard, UpdateBoard } from './decorator';
import { CreateBoardDto, UpdateBoardDto } from './types';

@ApiTags('BOARD')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @SwaggerCreateBoard()
  async createBoard(@CreateBoard() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get()
  async getAllBoard() {
    return this.boardService.getAllBoard();
  }

  @Patch('/:id')
  async updateBoard(
    @Param('id') id: string,
    @UpdateBoard() updateBoard: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard({ id, ...updateBoard });
  }
}
