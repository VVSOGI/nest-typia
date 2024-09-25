import typia from 'typia';
import { CreateBoardDto, CustomRequest } from '../decorator';

export class CreateBoardValidator {
  private body: CreateBoardDto;

  constructor(request: CustomRequest) {
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
