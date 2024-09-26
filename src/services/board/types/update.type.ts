export interface UpdateBoardArgs extends UpdateBoardDto {
  id: string;
}

export interface UpdateBoardDto {
  title: string;
  description: string;
}
