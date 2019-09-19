import jwt = require("jsonwebtoken");
import { Request } from "restify";
import { User } from "@/models/interface/user";
import { Security } from "@/config";

function createToken(user: User): string {
  const payload = {
    sub: user.id
  };
  const options: jwt.SignOptions = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, Security.JWT_SECRET, options);
}

function verifyEncodedToken(encodedToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (!encodedToken) {
        const error = new Error();
        error.name = "UnauthorizedError";
        return reject(error);
      }
      const decodedToken = jwt.verify(encodedToken, Security.JWT_SECRET);
      if (!decodedToken["sub"]) {
        throw new Error();
      }
      resolve(decodedToken);
    } catch (err) {
      const error: Error = new Error("Invalid token");
      error.name = "InvalidCredentialsError";
      reject(error);
    }
  });
}

function verifyTokenFromRequest(req: Request): Promise<any> {
  const encodedToken = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";
  return verifyEncodedToken(encodedToken);
}

export { createToken, verifyTokenFromRequest };
