const pathModule = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('follow-redirects').https;

const app = express();
const serverPort = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));


//create server
app.listen(serverPort, () => {
  console.log(`Server running on localhost:${serverPort}`);
});

app.get('/', (req, res) => {
  res.sendFile(pathModule.resolve(__dirname, 'dist/index.html'));
});

app.post('/text', handleTextRequest);

function handleTextRequest(req, res) {
  const clientURL = req.body.formText;

  const apiOptions = {
    method: 'POST',
    hostname: 'api.meaningcloud.com',
    path: `/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=${clientURL}&model=general`,
    headers: {},
    maxRedirects: 20,
  };

  const apiRequest = https.request(apiOptions, handleApiResponse);

  apiRequest.end();

  function handleApiResponse(apiResponse) {
    const responseChunks = [];

    apiResponse.on('data', (chunk) => {
      responseChunks.push(chunk);
    });

    apiResponse.on('end', () => {
      const responseBody = Buffer.concat(responseChunks);
      console.log(responseBody.toString());

      app.get('/url', (req, res) => {
        res.send(responseBody);
        responseChunks.length = 0;
      });
    });

    apiResponse.on('error', (error) => {
      console.error(error);
    });
  }
}