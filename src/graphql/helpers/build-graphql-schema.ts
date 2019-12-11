import { genericTypes } from '../generics/generic-types';

function buildBodySquema(preSchema: PreGraphqlSchema[]) {
  const body = preSchema
    .map(s => s.body)
    .filter(s => (s ? true : false))
    .join('');
  return body;
}

function buildQuerySchema(preSchema: PreGraphqlSchema[]) {
  const mutation = preSchema
    .map(s => s.query)
    .filter(s => (s ? true : false))
    .join('');
  return mutation;
}

function buildMutationSchema(preSchema: PreGraphqlSchema[]) {
  const mutation = preSchema
    .map(s => s.mutation)
    .filter(s => (s ? true : false))
    .join('');
  return mutation;
}

export default function buildGraphqlSchema(preSchema: PreGraphqlSchema[]) {
  const body = buildBodySquema(preSchema);
  const query = buildQuerySchema(preSchema);
  const mutation = buildMutationSchema(preSchema);
  const schema = `
    ${genericTypes}
    ${body}
    type RootQuery {
      ${query}
    }
    type RootMutation {
      ${mutation}
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `;
  return schema;
}
