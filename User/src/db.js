import mongoose from 'mongoose'

const connect = () => {
  const url = 'mongodb://mongo:27017/user'
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

export default connect
//docker_base_url/db1, db2 , db3 