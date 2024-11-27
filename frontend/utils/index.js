const { fetchData } = require('./fetchData');
const { apiHandler } = require('./handleAPI');

fetchData()
  .then(apiHandler)
  .catch(err => console.error(err));