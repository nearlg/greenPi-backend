import mongoose = require('mongoose');
import bcrypt = require('bcrypt');
import { rejectIfNull, toObject, normalizeFiledNames } from './helpers';
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
        type: String,
        required: [true, 'A user must have a password']
    },
    facebook: {
        id: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        }
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
    if (!user.isModified('password')) {
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
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IUser): Promise<IUser> {
        return this.updateByEmail(document.email, document);
    }

    updateByEmail(email: string, document: IUser): Promise<IUser> {
        return UserModel.findOneAndUpdate({email: email}, document)
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
        return UserModel.findOne({ email: email })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    getRoleNameByEmail(email: string): Promise<RoleName> {
        return UserModel.findOne({ email: email })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(toObject)
        .then(normalizeFiledNames)
        .then((user: IUser) => user.roleName);
    }
}

export const userRepository = new UserRepository();
