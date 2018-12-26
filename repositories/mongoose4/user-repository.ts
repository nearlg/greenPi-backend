import mongoose = require('mongoose');
import bcrypt = require('bcrypt');
import { rejectIfNull, normalizeData } from './helpers';
import { User } from '../../models/interface/user';
import { UserRepository } from '../interface/user-repository';
import { Security } from '../../config';
import { RoleName } from '../../services/authz.service/role-name';

interface UserModel extends User, mongoose.Document {
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
    const user: UserModel = this;
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


const UserModel = mongoose.model<UserModel>('User', userSchema);

export class UserMongooseRepository implements UserRepository {

    create(document: User): Promise<User> {
        return UserModel.create(document)
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    update(document: User): Promise<User> {
        return UserModel.findOneAndUpdate({email: document.email}, document)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    remove(id: string): Promise<User> {
        return UserModel.findByIdAndRemove(id)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    findAll(): Promise<User[]> {
        return UserModel.find().exec()
        .then(normalizeData);
    }

    find(id: string): Promise<User> {
        return UserModel.findById(id)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    findByEmail(email: string): Promise<User> {
        return UserModel.findOne({ email: email })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }

    getRoleName(id: string): Promise<RoleName> {
        return UserModel.findById(id)
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData)
        .then((user: User) => user.roleName);
    }

    findByGoogleId(id: string): Promise<User> {
        return UserModel.findOne({ 'googleId': id })
        .exec()
        .then(rejectIfNull('User not found'))
        .then(normalizeData);
    }
}
