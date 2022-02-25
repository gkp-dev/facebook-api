import './config/prelude'
import express from 'express'
import cors from 'cors'
import api from './api/index'
import handleConnectionToDatabase from './config/database/init'
import handleTest from './tests'

const launchServer = async () => {
  const app = express()

  //Initialize
  app.use(cors())
  app.use(express.json())
  handleConnectionToDatabase()
  app.use('/api', api)

  //Port
  const port = process.env.PORT || 4300
  app.listen(port, () => {
    console.log(`My app is listening on http://localhost:${port}/api/v1/ ...`)
  })
}

export default launchServer
