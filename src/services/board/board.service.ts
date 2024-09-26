import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Board } from 'src/entities';
import { BoardRepository } from './board.repository';
import { CreateBoardDto, UpdateBoardArgs } from './types';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoard() {
    return this.boardRepository.findAll();
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const board: Board = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createBoardDto,
    };

    return this.boardRepository.create(board);
  }

  async updateBoard(updateBoard: UpdateBoardArgs) {
    const target = await this.boardRepository.findById(updateBoard.id);
    const updated = { ...target, ...updateBoard };
    return this.boardRepository.update(updated);
  }

  async deleteBoard(id: string) {
    return this.boardRepository.delete(id);
  }
}
