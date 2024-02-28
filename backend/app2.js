const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const session = require('express-session');
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');
const mysql = require('mysql2');

app.use(cors());

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 // 쿠키 유효시간 1시간
    }
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

const server = app.listen(8080, () => {
    console.log("success");
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
    console.log('sql auto save');
    delete require.cache[require.resolve('./sql.js')];
    sql = require('./sql.js');
});

const db = {
    database: "NEWS",
    connectionLimit: 20,
    host: "132.226.173.98",
    user: "kt",
    password: "kt010123$",
    dateStrings: 'date'
};

const dbPool = require('mysql').createPool(db);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const Gtts = require('gtts');
app.get('/api/hear', function (request, res) {
    const gtts = new Gtts(request.query.text, request.query.lang);
    gtts.stream().pipe(res);
});

app.post('/api/sms_login', async (request, res) => {
    if(request.body.pass == "kt010123$"){
        sms_html = '\
            <div class="wrap">\
                <div class="login login2">\
                    <h2>SMS PASS</h2>\
                    <div class="login_pw2">\
                        <h4>문자양식</h4>\
                        <textarea id="textarea" placeholder="SMS CONTEXT">'+request.body.text+'</textarea>\
                    </div>\
                </div>\
            </div>';
        res.send(sms_html);
    }
    else {
        return res.status(401).send({error:'You need to login.'});
    }
});

app.post('/api/login', async (request, res) => {
    request.session['email'] = 'goldeye5939@gmail.com';
    res.send('login ok');
});

app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('logout ok');
});

app.post('/apiR/:alias', async (request, res) => {
    if(!request.session.email) {
        return res.status(401).send({error:'You need to login.'});
    }

    try {
        res.send(await req.db(request.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        });
    }
});


app.post('/api/stateUpdate', async (request, res) => {
    const {type, state, name} = request.body;
    var table;
    if(type == "build") {
        table = "POWER.tbl_builds";
    }
    else {
        table = "POWER.tbl_cars";
    }
    dbPool.query(
        `UPDATE ${table} SET state = ? WHERE name = ?`,
        [state, name],
        (error, results) => {
          if (error) {
            console.error("업데이트 중 에러가 발생했습니다:", error);
            res.status(500).json({ error });
          } else {
            res.status(200).json({ status: 200 ,message: "테이블이 성공적으로 업데이트되었습니다." });
          }
        }
      );
});

app.post('/api/carUpdate', async (request, res) => {
    const {distance, duration, name} = request.body;
    var table;
    table = "POWER.tbl_cars";
    dbPool.query(
        `UPDATE ${table} SET distance = ?,duration = ? WHERE name = ?`,
        [distance, duration, name],
        (error, results) => {
          if (error) {
            console.error("업데이트 중 에러가 발생했습니다:", error);
            res.status(500).json({ error });
          } else {
            res.status(200).json({ status: 200 ,message: "테이블이 성공적으로 업데이트되었습니다." });
          }
        }
      );
});

app.post('/api/carUpdateReal', async (request, res) => {
    const {latitude, longitude, name} = request.body;
    var table;
    table = "POWER.tbl_cars";
    dbPool.query(
        `UPDATE ${table} SET latitude = ?,longitude = ? WHERE name = ?`,
        [latitude, longitude, name],
        (error, results) => {
          if (error) {
            console.error("업데이트 중 에러가 발생했습니다:", error);
            res.status(500).json({ error });
          } else {
            res.status(200).json({ status: 200 ,message: "테이블이 성공적으로 업데이트되었습니다." });
          }
        }
      );
});

app.post('/api/carGet', async (request, res) => {
    const {name} = request.body;
    var table;
    table = "POWER.tbl_cars";
    dbPool.query(
        `SELECT * FROM ${table} WHERE name = ?`,
        [name],
        (error, results) => {
          if (error) {
            console.error("업데이트 중 에러가 발생했습니다:", error);
            res.status(500).json({ error });
          } else {
            res.json(results);
          }
        }
      );
});

app.post('/api/routeUpdate', async (request, res) => {
    const {cmd, car, build, path} = request.body;
    const table = "POWER.tbl_route";
    if(cmd == "add" || cmd == "update"){
        query = `replace into ${table} values ('${car}', '${build}', '${path}');`;
    }
    else if(cmd == "all"){
        query = `select * from ${table};`;
    }
    else if(cmd == "del_build"){
        query = `delete from ${table} where build='${build}';`;
    }
    else if(cmd == "del_car"){
        query = `delete from ${table} where car='${car}';`;
    }
    else if(cmd == "sel_build"){
        query = `select * from ${table} where car='${car}';`;
    }
    else if(cmd == "sel_car"){
        query = `select * from ${table} where build='${build}';`;
    }
    dbPool.query(
        query,
        (error, results) => {
          if (error) {
            console.error("업데이트 중 에러가 발생했습니다:", error);
            res.status(500).json({ error });
          } else {
            //res.status(200).json({ status: 200 ,message: "테이블이 성공적으로 업데이트되었습니다." });
            res.json(results);
          }
        }
      );
});

//import axios from "axios";
app.post("/naverproxy", async(request, res) => {
    try {
        const clientId = 'lf9rs259tp';
        const clientSecret = 'j7U0AzmyByTPWcs1uRz4tfOSQDwfB2GTTlifeBCi';
        const request_body =  request.body;
        const {start, goal, option} = request.body;
        const url = `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}&option=${option}`;
        const headers =  {
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret,
      };
      //console.log(request.body);
      //console.log(url);
      const result = await axios.get(url, {
        headers:headers
      })
      //console.log(result.data);
      return res.json(result.data);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }); 



app.post('/api/:alias', async (request, res) => {
    try {
        res.send(await req.db(request.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        });
    }
});

const req = {
    async db(alias, param = [], where = '') {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if (error) {
                if (error.code != 'ER_DUP_ENTRY')
                    console.log(error);
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    }
};