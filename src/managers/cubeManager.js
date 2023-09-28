const cubes = [];
exports.create = (cubeData) => {
    cubes.push({
        id: cubes.length + 1,
        ...cubeData,
    });
}
exports.getAll = () => cubes.slice();