import mongoose = require("mongoose");
import { rejectIfNull, normalizeData, paginateQuery } from "./helpers";
import { EnvironmentRepository } from "../interfaces/environment-repository";
import { Environment } from "../../entities/environment";
import { PaginationRequest } from "../../../lib/pagination/request";

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

const defaultPagination: PaginationRequest = {
  limit: 5
};

export class EnvironmentMongooseRepository implements EnvironmentRepository {
  async create(document: Environment): Promise<Environment> {
    let doc = await EnvironmentModel.create(document);
    rejectIfNull("Environment not found", doc);
    doc = await EnvironmentModel.populate(doc, {
      path: "pumps"
    });
    doc = await EnvironmentModel.populate(doc, {
      path: "sensors",
      populate: {
        path: "type"
      }
    });
    return normalizeData(doc);
  }

  async update(document: Environment): Promise<Environment> {
    const doc = await EnvironmentModel.findByIdAndUpdate(
      document.id,
      document,
      { new: true }
    )
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      })
      .exec();
    rejectIfNull("Environment not found", doc);
    return normalizeData(doc);
  }

  async remove(id: string): Promise<Environment> {
    const doc = await EnvironmentModel.findByIdAndRemove(id).exec();
    return normalizeData(doc);
  }

  async findAll(pagination: PaginationRequest = defaultPagination) {
    const query = EnvironmentModel.find()
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      });
    const countQuery = EnvironmentModel.estimatedDocumentCount();
    const paginatedData = await paginateQuery(query, countQuery, pagination);
    return paginatedData;
  }

  async find(id: string): Promise<Environment> {
    const doc = await EnvironmentModel.findById(id)
      .populate("pumps")
      .populate({
        path: "sensors",
        populate: {
          path: "type"
        }
      })
      .exec();
    rejectIfNull("Environment not found", doc);
    return normalizeData(doc);
  }
}
