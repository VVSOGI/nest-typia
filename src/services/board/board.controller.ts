import { Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoard, CreateBoardDto } from './decorator/createBoard.decorator';
import { ApiTags } from '@nestjs/swagger';
import { DocsCreateBoard } from './decorator';

@ApiTags('BOARD')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  @DocsCreateBoard()
  async createBoard(@CreateBoard() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get()
  async getAllBoard() {
    return this.boardService.getAllBoard();
  }
}
