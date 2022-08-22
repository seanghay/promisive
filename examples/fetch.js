(async function () {
  const { promisive } = require('..');
  const axios = require('axios').default;
  const f = url => axios.get(url).then(d => d.data);
  const response = await promisive({
    posts: f('https://jsonplaceholder.typicode.com/posts'),
    a: [
      { 
        users: f('https://jsonplaceholder.typicode.com/users'),
      }
    ]
  })
  console.log(response)  
})()
