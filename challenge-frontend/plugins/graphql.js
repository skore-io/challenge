// plugins/graphql.js
import { GraphQLClient } from 'graphql-request'

export default (context, inject) => {
  const client = new GraphQLClient('http://localhost:3000/graphql', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMThjMzdjZTItY2QzNC00MzA1LTljYTQtYzE1ZmM3MzZiZWFjIn0.pqWRiyQuvWRVQgIzKvQ85RrBwSF5KxeGZrkFvKt2CG8',
    },
  })

  inject('graphql', client)
}
