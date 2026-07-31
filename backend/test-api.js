import axios from 'axios';
axios.post('http://localhost:8000/api/auth/google-auth', {
    email: 'test6@test.com',
}).then(res => console.log('STATUS:', res.status)).catch(err => console.log(err.message));
