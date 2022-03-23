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