const uniqid = require('uniqid');
const cubes = [];

exports.create = (cubeData) => {
    cubes.push({
        id: uniqid(),
        ...cubeData,
    });
}
exports.getAll = () => cubes.slice();