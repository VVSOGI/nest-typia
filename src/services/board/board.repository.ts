import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async create(board: Board) {
    const created = this.boardRepository.create(board);
    return await this.boardRepository.save(created);
  }

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

  async findById(id: string) {
    const target = await this.boardRepository.findOneBy({ id });

    if (!target) {
      throw new NotFoundException(`Couldn't find board that id is ${id}`);
    }

    return target;
  }

  async update(board: Board) {
    return await this.boardRepository.save(board);
  }

  async delete(id: string) {
    return await this.boardRepository.delete(id);
  }
}
