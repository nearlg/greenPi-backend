import { ErrorBuilder } from "../error-builder";
import { AuthErrorName } from "./auth-error-name";
import { GenericErrorName } from "../generic-error/generic-error-name";

export default <ErrorBuilder>{
  errorIsRecognized(err: Error): boolean {
    return err.name in AuthErrorName;
  },
  build(err: Error): CustomError {
    const code = this.errorIsRecognized(err)
      ? AuthErrorName[err.name]
      : GenericErrorName;
    const customError = <CustomError>{
      code,
      message: err.message
    };
    return customError;
  }
};
