import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from 'src/entities';
import { UpdateBoardDto } from './types';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async findAll() {
    const [data, total] = await this.boardRepository.findAndCount({
      order: {
        createdAt: 'desc',
      },
    });
    return {
      data,
      total,
    };
  }

  async create(board: Board) {
    const created = this.boardRepository.create(board);
    return this.boardRepository.save(created);
  }

  async update(board: UpdateBoardDto) {
    // const target = this.boardRepository.findOneBy({id: board.})
  }
}
