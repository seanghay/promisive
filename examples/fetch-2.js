(async function () {
  const { promisive } = require('..');
  const axios = require('axios').default;
  const f = url => axios.get(url).then(d => d.data);
  const response = await promisive(f('https://jsonplaceholder.typicode.com/posts'));
  const response2 = await promisive([f('https://jsonplaceholder.typicode.com/posts')]);
  console.log(response)  
  console.log(response2)
})()
