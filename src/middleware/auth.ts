import jwt from 'jsonwebtoken'
import express from 'express'

const auth = (req: any, res: express.Response, next: express.NextFunction) => {
  let token = req.header('authorization')
  if (token) {
    token = token.split('Bearer ')[1]
  } else {
    res.status(401).json('Acces denied. No token provided')
  }
  try {
    const decoded = jwt.verify(token, `${process.env.jwtPrivateKey}`)
    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).json('Invalid token')
  }
}

export default auth
