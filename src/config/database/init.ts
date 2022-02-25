import mongoose from 'mongoose'

const handleConnectionToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || '')
    console.log('Connect to database')
  } catch (err) {
    throw new Error('Could not connect to database due to' + err)
  }
}

export default handleConnectionToDatabase
