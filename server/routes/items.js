

import express from 'express';
import axios from 'axios';

import api from '../api';

const route = express.Router();

route.get('/', (req, res) => {
    axios.get(api.groupItems(req.query.id))
        .then(resp => res.json( resp.data.items ))
        .catch(err => res.status(400).json({ errors: 'Can\'t get group\'s items' }))
});



export default route;