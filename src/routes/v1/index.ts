import fs from 'fs'
import path from 'path'
import express from 'express'

const router = express.Router()
const indexFile = path.basename(__filename)

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== indexFile && /\.route\.(ts|js)$/.test(file.slice(-9)))
  .forEach(async (routeFile) => {
    try {
      router.use(`/${routeFile.split('.')[0]}`, (await import(`./${routeFile}`)).default)
    } catch (err) {
      console.error(err)
    }
  })

export default router
