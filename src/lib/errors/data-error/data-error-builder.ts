import { ErrorBuilder } from "../error-builder";
import { DataErrorName } from "./data-error-name";
import { GenericErrorName } from "../generic-error/generic-error-name";

export default <ErrorBuilder>{
  errorIsRecognized(err: Error): boolean {
    return err.name in DataErrorName;
  },
  build(err: Error): CustomError {
    const code = this.errorIsRecognized(err)
      ? DataErrorName[err.name]
      : GenericErrorName;
    const customError = <CustomError>{
      code,
      message: err.message
    };
    return customError;
  }
};
