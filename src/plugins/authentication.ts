import { Request, Next, Response } from "restify";
import { setAuthRequestField } from "../services/auth.service";
import { verifyTokenFromRequest } from "../services/jwt.service";
import { handleErrors } from "../services/restify-error-handler";

export async function requestAuth(req: Request, res: Response, next: Next) {
  try {
    await setAuthRequestField(req, verifyTokenFromRequest);
    next();
  } catch (err) {
    handleErrors(next, err);
  }
}
