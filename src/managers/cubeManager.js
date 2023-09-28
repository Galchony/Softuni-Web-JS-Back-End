const uniqid = require('uniqid');
const cubes = [
    {
        id: '34092740973094710',
        name: 'Rubic',
        description: 'For fun',
        imageUrl: 'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_760/MTk3MDg5MjU5NDA3MDI1MjM1/rubik-cube-algorithms.webp',
        difficultyLevel: 5
    }
];

exports.create = (cubeData) => {
    cubes.push({
        id: uniqid(),
        ...cubeData,
    });
}
exports.getAll = () => cubes.slice();
exports.getOne = (cubeId) => cubes.find(x=> x.id == cubeId);