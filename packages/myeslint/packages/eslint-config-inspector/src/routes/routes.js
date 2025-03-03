import Router from 'express'
import {router as tree} from './tree'
import {SERVER_URL, SERVER_PORT} from '../../index'


const router = new Router()

router.use('/tree', tree)

export {router}