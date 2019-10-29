import bcrypt = require("bcrypt");
import { AuthErrorName } from "../../../../lib/errors/auth-error/auth-error-name";

export async function checkCredentials(password: string, userPassword: string) {
  try {
    const passwdIsCorrect = await bcrypt.compare(password, userPassword);
    if (!passwdIsCorrect) {
      throw new Error();
    }
  } catch (e) {
    // With this, the real error is hidden and
    // is more complex to know if the user does not exist
    // or the password was wrong
    const err = new Error();
    err.name = AuthErrorName.InvalidCredentialsError;
    throw err;
  }
}
