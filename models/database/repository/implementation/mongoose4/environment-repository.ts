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
        .then((o: IEnvironmentModel) => EnvironmentModel.populate(o, {
            path: 'pumps'}))
        .then((o: IEnvironmentModel) =>
            EnvironmentModel.populate(o, {
                path: 'sensors',
                populate: {
                    path: 'type'
                }
            })
        )
        .then(toObject)
        .then(normalizeFiledNames);
    }

    update(document: IEnvironment): Promise<IEnvironment> {
        return EnvironmentModel.findByIdAndUpdate(document.id, document,
            {'new': true})
        .populate('pumps')
        .populate({path:'sensors', populate: {
            path: 'type'
        }})
        .exec()
        .then(rejectIfNull('Environment not found'))
        .then(toObject)
        .then(normalizeFiledNames);
    }

    remove(id: string): Promise<IEnvironment> {
        return EnvironmentModel.findByIdAndRemove(id)
        .exec()
        .then(toObject)
        .then(normalizeFiledNames);
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

    find(id: string): Promise<IEnvironment> {
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
