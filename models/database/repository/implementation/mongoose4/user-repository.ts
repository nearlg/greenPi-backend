import mongoose = require('mongoose');
import bcrypt = require('bcrypt');
import { rejectIfNull, normalizeData } from './helpers';
import { IUser } from '../../../../interface/user';
import { IUserRepository } from '../../shared/user-repository';
import { Security } from '../../../../../config';
import { RoleName } from '../../../../../services/authz-service/role-name';

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
        type: String
    },
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    },
    roleName: {
        type: String,
        default: RoleName.Observer,
        required: [true, 'A user must have a rol name']
    }
});

// Encrypt user's password before saving it to the database
userSchema.pre('save', function (next) {
    const user: IUserModel = this;
    if (!user.password || !user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, Security.BCRYPT_SALT_ROUNDS)
    .then(hash => {
        user.password = hash
        return next();
    })
    .catch(err => next(err));
});


const UserModel = mongoose.model<IUserModel>('User', userSchema);

export class UserRepository implements IUserRepository {

    create(document: IUser): Promise<IUser> {
        return UserModel.create(document)
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    update(document: IUser): Promise<IUser> {
        return UserModel.findOneAndUpdate({email: document.email}, document)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    remove(email: string): Promise<IUser> {
        return UserModel.findOneAndRemove({email: email})
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    findAll(): Promise<IUser[]> {
        return UserModel.find().exec()
        .then(normalizeData);
    }

    find(email: string): Promise<IUser> {
        return UserModel.findOne({ email: email })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    getRoleName(email: string): Promise<RoleName> {
        return UserModel.findOne({ email: email })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData)
        .then((user: IUser) => user.roleName);
    }

    findByGoogleId(id: string): Promise<IUser> {
        return UserModel.findOne({ 'google.id': id })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }
}

export const userRepository = new UserRepository();
