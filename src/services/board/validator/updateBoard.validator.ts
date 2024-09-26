import typia from 'typia';
import { UpdateRequest } from '../decorator';
import { UpdateBoardDto } from '../types';

export class UpdateBoardValidator {
  private body: UpdateBoardDto;

  constructor(request: UpdateRequest) {
    this.body = request.body;
  }

  validate(): UpdateBoardDto | typia.IValidation.IError {
    const checkValidate: typia.IValidation<UpdateBoardDto> =
      typia.validateEquals<UpdateBoardDto>(this.body);
    const { success, errors } = checkValidate;

    if (success) {
      return this.body;
    }

    return errors[0];
  }
}
