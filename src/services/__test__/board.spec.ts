import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../board/board.controller';
import { BoardService } from '../board/board.service';
import { Board } from 'src/entities';
import { CreateBoardDto } from '../board/dto/createBoard.dto';
import { BadRequestException } from '@nestjs/common';

describe('BoardModule', () => {
  let controller: BoardController;
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [
        {
          provide: BoardService,
          useValue: {
            getAllBoard: jest.fn(),
            createBoard: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBoard', () => {
    it('should return Board type array', async () => {
      const mockBoards: Board[] = [
        {
          id: '1',
          title: 'Test Board 1',
          description: 'Description 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Test Board 2',
          description: 'Description 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'getAllBoard').mockResolvedValue({
        data: mockBoards,
        total: mockBoards.length,
      });

      const result = (await controller.getAllBoard()).data;
      const [first, second] = result;

      expect(first.id).toBe('1');
      expect(second.id).toBe('2');
    });

    it('should return empty array', async () => {
      jest.spyOn(service, 'getAllBoard').mockResolvedValue({
        data: [],
        total: 0,
      });
      const result = (await controller.getAllBoard()).data;
      expect(result.length).toBe(0);
    });
  });
});
