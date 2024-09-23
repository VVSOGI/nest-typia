import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  async getAllBoard() {
    return 'all board';
  }
}
