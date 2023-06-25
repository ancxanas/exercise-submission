const Book = require('./models/book')

const batchCountBooks = async (keys) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: keys } } },
    { $group: { _id: '$author', count: { $sum: 1 } } },
  ])

  const countsByAuthor = counts.reduce((acc, cur) => {
    acc[cur._id] = cur.count
    return acc
  }, {})

  return keys.map((key) => countsByAuthor[key] || 0)
}

module.exports = batchCountBooks
