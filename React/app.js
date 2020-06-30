/*Tsui Lok In 1155094820 assg4 */
const express = require('express');
const app = express();
const router = express.Router();
app.use(express.static('timeline'));
const server = app.listen(3000);