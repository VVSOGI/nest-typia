import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities';
import { UpdateBoardArgs } from './types';

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
    return await this.boardRepository.save(created);
  }

  async update(board: UpdateBoardArgs) {
    const target = await this.boardRepository.findOneBy({ id: board.id });

    if (!target) {
      throw new NotFoundException(`Couldn't find board that id is ${board.id}`);
    }

    const updated = { ...target, ...board };
    return await this.boardRepository.save(updated);
  }

  async delete(id: string) {
    return await this.boardRepository.delete(id);
  }
}
