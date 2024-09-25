import typia from 'typia';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { TypiaExceptionHandler } from 'src/common';
import { Board } from 'src/entities';
import { BoardController } from '../board/board.controller';
import { BoardService } from '../board/board.service';
import { CreateBoardValidator } from '../board/validator';

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

  describe('createBoard', () => {
    it('should throw error when sent wrong data', () => {
      const request = {
        body: {
          title: 'test title',
          description: 'test description',
          hack: 'hack',
        },
      };

      try {
        const result = new CreateBoardValidator(request).validate();
        if (typia.is<typia.IValidation.IError>(result)) {
          const ExceptionHandler = new TypiaExceptionHandler(result);
          ExceptionHandler.handleValidationError();
        }
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.response.message).toBe(
          `Received unexpected data 'hack' [WRONG DATA SENT ERROR]`,
        );
      }
    });

    it('should throw error when sent missing data', () => {
      const request = {
        body: {
          title: null,
          description: 'test description',
        },
      };

      try {
        const result = new CreateBoardValidator(request).validate();
        if (typia.is<typia.IValidation.IError>(result)) {
          const ExceptionHandler = new TypiaExceptionHandler(result);
          ExceptionHandler.handleValidationError();
        }
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.response.message).toBe(
          `Received unexpected data 'title' [MISSING DATA ERROR]`,
        );
      }
    });

    it('should throw error when sent invalid type data', () => {
      const request = {
        body: {
          title: 1000,
          description: 'test description',
        },
      };

      try {
        const result = new CreateBoardValidator(request).validate();
        if (typia.is<typia.IValidation.IError>(result)) {
          const ExceptionHandler = new TypiaExceptionHandler(result);
          ExceptionHandler.handleValidationError();
        }
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.response.message).toBe(
          `Received unexpected data 'title' [INVALID TYPE ERROR]`,
        );
      }
    });
  });

  describe('updateBoard', () => {
    it('should throw error when send invalid wrong data', () => {});
  });
});
