const axios = require('axios');
axios.post('http://localhost:8000/api/order/update-status/6a6cc1a849131e2713b226bc/6a6cc1a849131e2713b226bc', {status: 'out of delivery'}, {headers: {Cookie: 'token=dummy'}})
.then(r => console.log(r.data))
.catch(e => console.log(e.response ? e.response.data : e.message));
