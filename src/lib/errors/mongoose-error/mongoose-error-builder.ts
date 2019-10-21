import { ErrorBuilder } from "../error-builder";
import { MongooseErrorName } from "./mongoose-error-name";
import { GenericErrorName } from "../generic-error/generic-error-name";

export default <ErrorBuilder>{
  errorIsRecognized(err: Error): boolean {
    return err.name in MongooseErrorName;
  },
  build(err: Error): CustomError {
    const code = this.errorIsRecognized(err)
      ? MongooseErrorName[err.name]
      : GenericErrorName;
    const customError = <CustomError>{
      code,
      message: err.message
    };
    return customError;
  }
};
