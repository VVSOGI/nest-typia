import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../board/board.controller';
import { BoardService } from '../board/board.service';
import { Board } from 'src/entities';

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
            getAllBoard: jest.fn(async (board: Board[] | [] = []) => board),
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
    it('can be return Board type array', async () => {
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

      jest.spyOn(service, 'getAllBoard').mockResolvedValue(mockBoards);

      const result = await controller.getAllBoard();
      const [first, second] = result;

      expect(first.id).toBe('1');
      expect(second.id).toBe('2');
    });

    it('can be return empty array', async () => {
      jest.spyOn(service, 'getAllBoard').mockResolvedValue([]);
      const result = await controller.getAllBoard();
      expect(result.length).toBe(0);
    });
  });
});
