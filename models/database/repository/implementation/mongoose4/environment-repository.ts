import mongoose = require('mongoose');
import { rejectIfNull, toObject, normalizeFiledNames } from "./helpers";
import { IEnvironmentRepository } from "../../shared/environment-repository";
import { IEnvironment } from "../../../../interface/environment";

export interface IEnvironmentModel extends IEnvironment, mongoose.Document {
}

const EnvironmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An environment must have a name']
    },
    description: String,
    sensors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor'
    }],
    pumps: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pump'
    }],
});

const EnvironmentModel = mongoose.model<IEnvironmentModel>('Environment', EnvironmentSchema);

export class EnvironmentRepository implements IEnvironmentRepository {

    create(document: IEnvironment): Promise<IEnvironment> {
        return EnvironmentModel.create(document)
        .then(rejectIfNull('Environment not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IEnvironment): Promise<IEnvironment> {
        return EnvironmentModel.findByIdAndUpdate(document.id, document, {'new': true})
        .populate('pumps')
        .populate({path:'sensors', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Environment not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    updateById(id: string, document: IEnvironment): Promise<IEnvironment>{
        return EnvironmentModel.findByIdAndUpdate(id, document)
        .populate('pumps')
        .populate({path:'sensors', populate: {
            path: 'type'
        }})
        .exec();
    }

    remove(document: IEnvironment): Promise<void> {
        return EnvironmentModel.findByIdAndRemove(document.id).exec()
            .then(rejectIfNull('Environment not found'))
            .then(() => null);
    }

    removeById(id: string): Promise<void> {
        return EnvironmentModel.findByIdAndRemove(id).exec()
            .then(rejectIfNull('Environment not found'))
            .then(() => null);
    }

    findAll(): Promise<IEnvironment[]> {
        return EnvironmentModel.find()
            .populate('pumps')
            .populate({path:'sensors', populate: {
                path: 'type'
            }})
            .exec()
            .then(toObject)
            .then(normalizeFiledNames);
    }

    findById(id: string): Promise<null|IEnvironment> {
        return EnvironmentModel.findById(id)
            .populate('pumps')
            .populate({path:'sensors', populate: {
                path: 'type'
            }})
            .exec()
            .then(rejectIfNull('Environment not found'))
            .then(toObject)
            .then(normalizeFiledNames);
    }
}

export const environmentRepository = new EnvironmentRepository();
