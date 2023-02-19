const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')

router.get('/allpolls', async (req, res) => {
    try {
        const { search, status, sort } = req.query;
        const queryObject = {}

        if (search) {
            queryObject.search = { $regex: search, $options: 'i' }
        }

        if (status && status !== 'all') {
            queryObject.status = status
        }

        let result = Poll.find(queryObject)

        if (sort === 'alphabetically') {
            result = result.sort('name')
        }

        if(sort === 'status'){
            result = result.sort('status')
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        result = result.skip(skip).limit(limit)

        const poll = await result
        res.status(201).json(poll)

    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router