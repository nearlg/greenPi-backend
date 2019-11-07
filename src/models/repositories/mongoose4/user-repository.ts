import mongoose = require("mongoose");
import bcrypt = require("bcrypt");
import { rejectIfNull, normalizeData } from "./helpers";
import { User } from "../../entities/user";
import { UserRepository } from "../interface/user-repository";
import { Security } from "../../../config";
import { RoleName } from "../../role-name";

interface UserModel extends User, mongoose.Document {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "A user must have an email"],
    index: { unique: true },
    lowercase: true
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
    lowercase: true
  },
  password: {
    type: String
  },
  facebookId: {
    type: String,
    index: { unique: true },
    sparse: true
  },
  googleId: {
    type: String,
    index: { unique: true },
    sparse: true
  },
  roleName: {
    type: String,
    default: RoleName.Observer,
    required: [true, "A user must have a rol name"]
  }
});

// Encrypt user's password before saving it to the database
userSchema.pre("save", async function(next) {
  const user: UserModel = <UserModel>this;
  if (!user.password || !user.isModified("password")) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(user.password, Security.BCRYPT_SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    next(err);
  }
});

const UserModel = mongoose.model<UserModel>("User", userSchema);

export class UserMongooseRepository implements UserRepository {
  async create(document: User): Promise<User> {
    const doc = await UserModel.create(document);
    return normalizeData(doc);
  }

  async update(document: User): Promise<User> {
    const doc = await UserModel.findOneAndUpdate(
      { email: document.email },
      document
    ).exec();
    rejectIfNull("User not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<User> {
    const doc = await UserModel.findByIdAndRemove(id).exec();
    rejectIfNull("User not found", doc);
    return normalizeData(doc);
  }

  async findAll(): Promise<User[]> {
    const docs = await UserModel.find().exec();
    return normalizeData(docs);
  }

  async find(id: string): Promise<User> {
    const doc = await UserModel.findById(id).exec();
    rejectIfNull("User not found", doc);
    return normalizeData(doc);
  }

  async findByEmail(email: string): Promise<User> {
    const doc = await UserModel.findOne({ email }).exec();
    rejectIfNull("User not found", doc);
    return normalizeData(doc);
  }

  async getRoleName(id: string) {
    const doc = await UserModel.findById(id).exec();
    rejectIfNull("User not found", doc);
    const user: User = normalizeData(doc);
    return user.roleName;
  }

  async findByGoogleId(id: string): Promise<User> {
    const doc = await UserModel.findOne({ googleId: id }).exec();
    rejectIfNull("User not found", doc);
    return normalizeData(doc);
  }
}
