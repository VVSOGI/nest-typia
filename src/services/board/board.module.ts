import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/entities';
import { BoardController, BoardRepository, BoardService } from '.';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
