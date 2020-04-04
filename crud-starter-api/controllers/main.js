const getTableData = (req, res, db) => {
  db.select('*').from('nametable')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postTableData = (req, res, db) => {
  const { first, last } = req.body
  const added = new Date()
  db('nametable').insert({ first, last, added })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const putTableData = (req, res, db) => {
  const { id, first, last } = req.body
  db('nametable').where({ id }).update({ first, last })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('nametable').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}