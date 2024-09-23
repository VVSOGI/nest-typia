import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/entities';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getAllBoard() {
    return this.boardRepository.find();
  }

  async createBoard(board: Board) {
    const created = this.boardRepository.create(board);
    return this.boardRepository.save(created);
  }
}
