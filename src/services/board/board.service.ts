import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Board } from 'src/entities';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './decorator';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoard() {
    return this.boardRepository.getAllBoard();
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createBoardDto,
    };

    return this.boardRepository.createBoard(board);
  }
}
