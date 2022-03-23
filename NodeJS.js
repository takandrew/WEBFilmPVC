// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const express = require('express');
//
// express
//
// const server = http.createServer((req, res) => {
//     let index_path = path.join(__dirname, req.url === '/' ? 'Index.html' : req.url);
//     const ext = path.extname(index_path);
//
//     if (!ext) {
//         index_path += ".html";
//     }
//
//     let content_type = 'text/html';
//
//     switch (ext) {
//         case '.css':
//             content_type = 'text/css'
//             break
//         case '.js':
//             content_type = 'text/javascript'
//             break
//         default:
//             content_type = 'text/html'
//     }
//
//     if (req.url === '/') {
//         fs.readFile(index_path, (err, content) => {
//             if (err) {
//                 throw err;
//             }
//             res.writeHead(200, {
//                 'Content-Type': content_type
//             });
//             res.end(content);
//         })
//     }
// });
//
// const port_id = process.env.PORT || 8080;
//
// server.listen(port_id, () => {
//     console.log(`Server has been started on port: ${port_id}.`);
// });

const express = require('express');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

const port_id = process.env.PORT || 8080;
app.listen(port_id, () => {
    console.log(`Server has been started on port: ${port_id}.`);
})