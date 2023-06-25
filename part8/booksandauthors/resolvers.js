const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const DataLoader = require('dataloader')
const batchCountBooks = require('./batchCountBooks')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const bookCountLoader = new DataLoader(batchCountBooks)

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        return Book.find({
          author: args.author,
          genres: args.genre,
        }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      } else if (args.author) {
        return Book.find({ author: args.author }).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      return Author.find({})
    },
    allUsers: async () => User.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return bookCountLoader.load(root._id)
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.author })

      if (!author) {
        const author = new Author({ name: args.author })

        try {
          await author.save()

          const book = new Book({ ...args, author: author._id })

          try {
            await book.save()
          } catch (error) {
            throw new GraphQLError('Adding book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error,
              },
            })
          }

          const savedBook = await Book.findById(book._id).populate('author')

          pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

          return savedBook
        } catch (error) {
          throw new GraphQLError('Adding author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      const savedBook = await Book.findById(book._id).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      return await Author.findOneAndUpdate(
        { name: args.name },
        {
          born: args.setBornTo,
        },
        { new: true }
      )
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args

      const user = new User({ username, favoriteGenre })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers
