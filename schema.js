const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripción del curso
    descripcion: String!
    profesor: Profesor
    rating: Float
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`
const resolvers = {
  Query: {
    cursos: () => {
      return [
        {
          id: 1,
          titulo: 'Graphql',
          descripcion: 'curso de graphql'
        },
        {
          id: 2,
          titulo: 'Php',
          descripcion: 'curso de php'
        }
      ]
    }
  },
  Curso: {
    profesor: () => {
      return {
        nombre: 'Jesus',
        nacionalidad: 'Venezuela'
      }
    },
    comentarios: () => {
      return [{
        id:1,
        nombre: 'luisj135',
        cuerpo: 'testing GraphQl'
      },
      {
        id:2,
        nombre: 'Platzi',
        cuerpo: 'testing Platzi GraphQl'
      }]
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

addMockFunctionsToSchema({
  schema,
  mocks: {
    Curso: () => {
      return {
        id: casual.uuid,
        titulo: casual.sentence,
        descripcion: casual.sentences(2)
      }
    },
    Profesor: () => {
      return {
        nombre: casual.name,
        nacionalidad: casual.country
      }
    }
  },
  preserveResolvers: false
})

module.exports = schema
