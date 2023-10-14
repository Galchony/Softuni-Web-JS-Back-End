const User = require('../models/User');

exports.register = (userdata)=> User.create(userdata);