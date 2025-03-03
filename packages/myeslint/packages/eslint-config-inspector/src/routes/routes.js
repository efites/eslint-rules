import Router from 'express'
import {router as treeRoute} from './tree.js'


const router = new Router()

router.use('/tree', treeRoute)

export {router}