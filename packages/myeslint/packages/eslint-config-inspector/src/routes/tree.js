import Router from 'express'
import {getFullTree, getNode} from '../controllers/tree.js'


const router = new Router()

router.get('/', getFullTree)
router.get('/:id', getNode)

export {router}