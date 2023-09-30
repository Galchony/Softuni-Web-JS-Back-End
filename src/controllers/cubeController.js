const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    res.render('details', cube);
})

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;

   await cubeManager.create({ name, description, imageUrl, difficultyLevel: Number(difficultyLevel) });
    res.redirect('/');
})

module.exports = router;