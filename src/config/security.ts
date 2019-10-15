export const BCRYPT_SALT_ROUNDS = process.env.SECURITY_BCRYPT_SALT_ROUNDS
  ? Number(process.env.SECURITY_BCRYPT_SALT_ROUNDS)
  : 10;
export const JWT_SECRET = process.env.SECURITY_JWT_SECRET;
