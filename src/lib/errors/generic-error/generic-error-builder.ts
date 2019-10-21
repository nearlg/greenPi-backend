import { ErrorBuilder } from "../error-builder";
import { GenericErrorName } from "./generic-error-name";

export default <ErrorBuilder>{
  errorIsRecognized(err: Error): boolean {
    return err.name === GenericErrorName;
  },
  build(err: Error): CustomError {
    const customError = <CustomError>{
      code: GenericErrorName,
      message: err.message
    };
    return customError;
  }
};
