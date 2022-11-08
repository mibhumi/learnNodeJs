const {people, age} = require('./people');
const os = require('os');

console.log('People: ' + people + '\nAge: ' + age);
console.log('os platform: ' + os.platform());