const MongoClient = require('mongodb').MongoClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/");

function mongo_push() {
    mongoClient.connect(function(err, client){
        if(err){
            return console.log(err);
        }
        const db = client.db("pvc_db");
        const collection = db.collection("rectangle");
        for (let i = 0; i < rect_arr.length; i++) {
            collection.insertOne({temp: rect_arr[i].temp,time: rect_arr[i].time,
                L: rect_arr[i].L,a: rect_arr[i].a,b: rect_arr[i].b,Y: rect_arr[i].Y});
        }
        console.log(`New insert into db: temp: ${temp},time: ${time},L: ${LAB_L},a: ${LAB_a},b: ${LAB_b},Y: ${YI}`);
        client.close();
    });
}
