const express = require('express');
const app = express();
const PORT = 5000;

app.get('/api/users/profile/tester', (req, res) => {
  console.log('--- MINIMAL TEST SERVER WAS REACHED ---');
  res.send('Minimal test server is working!');
});

app.listen(PORT, () => {
  console.log(`Minimal test server is running on port: ${PORT}`);
});
