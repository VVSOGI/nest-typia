import typia from 'typia';
import { CreateRequest } from '..';
import { CreateBoardDto } from '../../types';

/**
 * 이 부분은 원래 Validator로 Generic type을 이용해서 다방면으로 사용할 수 있게 하려고 했으나,
 * 현재 typia는 generic으로 타입을 전달하면 컴파일 단계에서 막혀버린다.
 * 아직 해결하지 못한 이슈로 남아있는 것 같아 분리해서 사용하기로 결정.
 */
export class CreateBoardValidator {
  private body: CreateBoardDto;

  constructor(request: CreateRequest) {
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
