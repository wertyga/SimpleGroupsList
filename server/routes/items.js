

import express from 'express';
import axios from 'axios';

import api from '../api';

const route = express.Router();

route.get('/', (req, res) => {
    axios.get(api.groupItems(req.query.id))
        .then(resp => res.json( resp.data.items ))
        .catch(err => res.status(400).json({ errors: 'Can\'t get group\'s items' }))
});

route.post('/item', (req, res) => {
    const { id } = req.body;

    axios.get(api.item(id))
        .then(resp => res.json( resp.data.item ))
        .catch(err => res.status(400).json({ errors: 'Can\'t get group\'s item' }))
});



export default route;