import mongoose from 'mongoose'

const getDB = () => {
  const urlContent = 'mongodb://mongo:27017/content'
  const urlUser = 'mongodb://mongo:27017/user'
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  const userDB = mongoose.createConnection(urlUser, options)
  const contentDB = mongoose.createConnection(urlContent, options)

  const db = {
    userDB,
    contentDB
  }
  return db
}

export default getDB
// docker_base_url/db1, db2 , db3
