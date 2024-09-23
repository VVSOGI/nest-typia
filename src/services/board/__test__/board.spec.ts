import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../board.controller';
import { BoardService } from '../board.service';
import { BoardRepository } from '../board.repository';
import { Repository } from 'typeorm';
import { Board } from 'src/entities';
import { MockType, repositoryMockFactory } from 'src/utils';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardController', () => {
  let controller: BoardController;
  let repositoryMock: MockType<Repository<Board>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        BoardService,
        BoardRepository,
        {
          provide: getRepositoryToken(Board),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    repositoryMock = module.get(getRepositoryToken(Board));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
