import mongoose = require('mongoose');
import bcrypt = require('bcrypt');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
import { IUser } from '../../../../interface/user';
import { IUserRepository } from '../../shared/user-repository';
import { Security } from '../../../../../config';
import { NotExtendedError } from 'restify-errors';

export interface IUserModel extends IUser, mongoose.Document {
}

const userSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: [true, 'A user must have a password'],
        index: { unique: true },
        lowercase: true
    },
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        lowercase: true
    },
    password: {
        type: String,
        select: false,
        required: [true, 'A user must have a password']
    },
    facebook: {
        id: {
            type: String,
            required: [true, 'A Facebook account must have an id']
        }
    },
    google: {
        id: {
            type: String,
            required: [true, 'A Google account must have an id']
        }
    }
});

// Encrypt user's password before saving it to the database
userSchema.pre('save', function (next) {
    const user: IUserModel = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(Security.BCRYPT_SALT_ROUNDS, user.password)
    .then(hash => {
        user.password = hash
        return user;
    })
    .then(user => next())
    .catch(err => next(err));
});


const UserModel = mongoose.model<IUserModel>('User', userSchema);

export class UserRepository implements IUserRepository {

    create(document: IUser): Promise<IUser> {
        return UserModel.create(document)
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IUser): Promise<IUser> {
        return UserModel.findOneAndUpdate({email: document.email}, document)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    updateByEmail(email: string, document: IUser): Promise<IUser>{
        return UserModel.findOneAndUpdate({email: document.email}, document)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(document: IUser): Promise<void> {
        return this.removeByEmail(document.email);
    }

    removeByEmail(email: string): Promise<void> {
        return UserModel.findOneAndRemove({email: email})
        .exec()
        .then(rejectIfNull('User not found'))
        .then(() => null);
    }

    findAll(): Promise<IUser[]> {
        return UserModel.find().exec()
        .then(toObject)
        .then(normalizeFiledNames);
    }

    findByEmail(email: string): Promise<null | IUser> {
        return UserModel.findOne(email).exec()
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }
}

export const userRepository = new UserRepository();