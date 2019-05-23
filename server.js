const app = require('./app');
const port = process.env.PORT || 4050;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});