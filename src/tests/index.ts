import { hashPassword, comparePassword } from '../helpers/password'
import { generateToken } from '../helpers/jwt'

const handleTest = async () => {
  try {
    const hash = await hashPassword('salut')
    console.log(hash)
    console.log(await comparePassword('saut', hash))
    console.log()
  } catch (err) {
    console.log(err)
  }
}

export default handleTest
