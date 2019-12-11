import { DocumentQuery, Document, Query } from 'mongoose';
import { DataErrorName } from '../../../../lib/errors/data-error/data-error-name';
import { PaginationRequest } from '../../../../lib/pagination/request';
import { Pagination } from '../../../../lib/pagination';
import { PagedData } from '../../../../lib/pagination/paged-data';

function toObjectDocument(document: any) {
  return document.toObject();
}

function normalizeDocuments(documents: any[]): any[] {
  return documents.map(normalizeFieldNames);
}

function normalizeDocument(document: any) {
  if (typeof document !== 'object') {
    return document;
  }
  // Normalize fields
  if (document._id) {
    document.id = document._id + '';
    delete document._id;
  }
  // Check all the fields
  for (const field in document) {
    // The field could be an ObjectID
    if (document[field]._bsontype === 'ObjectID') {
      document[field] = document[field] + '';
      continue;
    }
    normalizeFieldNames(document[field]);
  }
  return document;
}

function toObject(documents: any) {
  return Array.isArray(documents)
    ? documents.map(toObjectDocument)
    : toObjectDocument(documents);
}

function normalizeFieldNames(document: any) {
  return Array.isArray(document)
    ? normalizeDocuments(document)
    : normalizeDocument(document);
}

export function normalizeData<T>(data: T): T {
  data = toObject(data);
  return normalizeFieldNames(data);
}

export function rejectIfNull(errorMsg: string, document: any) {
  if (!document) {
    const err = new Error(errorMsg);
    err.name = DataErrorName.DataNotFoundError;
    throw err;
  }
}

export function getSearchingObject(gte?: Date, lte?: Date): Object {
  const searchingObject = {};
  if (gte || lte) {
    searchingObject['date'] = {};
    if (gte) {
      searchingObject['date']['$gte'] = gte;
    }
    if (lte) {
      searchingObject['date']['$lte'] = lte;
    }
  }
  return searchingObject;
}

export async function paginateQuery<T extends Document>(
  fetchQuery: DocumentQuery<T[], T>,
  countQuery: Query<number>,
  paginationReq: PaginationRequest
) {
  const page =
    !paginationReq.page || paginationReq.page < 1 ? 1 : paginationReq.page;
  const limit = Math.max(1, paginationReq.limit);
  const skip = (page - 1) * limit;
  fetchQuery = fetchQuery.skip(skip);
  if (limit) {
    fetchQuery = fetchQuery.limit(limit);
  }
  const total = await countQuery.exec();
  const pages = Math.ceil(total / limit);
  const docs = await fetchQuery.exec();
  const pagination: Pagination = {
    limit,
    page,
    pages,
    total
  };
  const paginatedData: PagedData<T> = {
    items: normalizeData(docs),
    pagination
  };
  return paginatedData;
}
