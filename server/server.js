const jsonServer = require('json-server');
const bodyParser = require('body-parser');

const app = jsonServer.create();
const port = 3001;

// Enable JSON parsing
app.use(bodyParser.json());

// JSON Server
const jsonServerRouter = jsonServer.router('db.json');
app.use('/api', jsonServerRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});