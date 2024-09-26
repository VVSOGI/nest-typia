import typia from 'typia';
import { CreateBoardDto, UpdateRequest } from '../decorator';

export class UpdateBoardValidator {
  private body: CreateBoardDto;

  constructor(request: UpdateRequest) {
    this.body = request.body;
  }

  validate(): CreateBoardDto | typia.IValidation.IError {
    const checkValidate: typia.IValidation<CreateBoardDto> =
      typia.validateEquals<CreateBoardDto>(this.body);
    const { success, errors } = checkValidate;

    if (success) {
      return this.body;
    }

    return errors[0];
  }
}
