import { Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoard, CreateBoardDto } from './decorator/createBoard.decorator';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  async createBoard(@CreateBoard() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get()
  async getAllBoard() {
    return this.boardService.getAllBoard();
  }
}
