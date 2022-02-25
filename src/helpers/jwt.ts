import jwt from 'jsonwebtoken'

const generateToken = (data: any) => {
  return jwt.sign(data, process.env.jwtPrivateKey || '')
}

const decodedToken = (token: string) => {
  return jwt.verify(token, process.env.jwtPrivateKey || '')
}

export { generateToken, decodedToken }
