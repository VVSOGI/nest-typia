import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoard() {
    return this.boardRepository.getAllBoard();
  }
}
