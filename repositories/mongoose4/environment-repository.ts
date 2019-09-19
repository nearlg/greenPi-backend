import mongoose = require("mongoose");
import { rejectIfNull, normalizeData } from "@/repositories/mongoose4/helpers";
import { EnvironmentRepository } from "@/repositories/interface/environment-repository";
import { Environment } from "@/models/interface/environment";

interface EnvironmentModel extends Environment, mongoose.Document {}

const EnvironmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An environment must have a name"]
  },
  description: String,
  sensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sensor"
    }
  ],
  pumps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pump"
    }
  ]
});

const EnvironmentModel = mongoose.model<EnvironmentModel>(
  "Environment",
  EnvironmentSchema
);

export class EnvironmentMongooseRepository implements EnvironmentRepository {
  create(document: Environment): Promise<Environment> {
    return EnvironmentModel.create(document)
      .then(rejectIfNull("Environment not found"))
      .then((o: EnvironmentModel) =>
        EnvironmentModel.populate(o, {
          path: "pumps"
        })
      )
      .then((o: EnvironmentModel) =>
        EnvironmentModel.populate(o, {
          path: "sensors",
          populate: {
            path: "type"
          }
        })
      )
      .then(normalizeData);
  }

  update(document: Environment): Promise<Environment> {
    return EnvironmentModel.findByIdAndUpdate(document.id, document, {
      new: true
    })
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      })
      .exec()
      .then(rejectIfNull("Environment not found"))
      .then(normalizeData);
  }

  remove(id: string): Promise<Environment> {
    return EnvironmentModel.findByIdAndRemove(id)
      .exec()
      .then(normalizeData);
  }

  findAll(): Promise<Environment[]> {
    return EnvironmentModel.find()
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      })
      .exec()
      .then(normalizeData);
  }

  find(id: string): Promise<Environment> {
    return EnvironmentModel.findById(id)
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      })
      .exec()
      .then(rejectIfNull("Environment not found"))
      .then(normalizeData);
  }
}
