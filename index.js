// 모듈 import
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mysql = require('promise-mysql');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

//아직 안쓴거
const http = require('http');

// use 설정
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname +'/user_scoreFile'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
  }
  /*
  key                 : 세션의 키 값
  secret             :  세션의 비밀 키, 쿠키값의 변조를 막기 위해서 이 값을 통해 세션을 암호화 하여 저장
  resave             : 세션을 항상 저장할 지 여부 (false를 권장)
  saveUninitialized : 세션이 저장되기전에 uninitialize 상태로 만들어 저장
  cookie             : 쿠기 설정
   */
}));

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'p12481632!',
  database: 'study_db',
}).then((conn) => {

  //////////////// 페이지 전송 파트//////////////
  app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
  });

  app.get('/mypage', function (req, res) {
    var user_id = req.session.user.id;
    res.sendFile(__dirname + "/public/Mypage.html");
  });
  app.get('/main', function (req, res) {
    if (req.session.user) {
      res.sendFile(__dirname + "/public/index-alt4.html");
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });

  app.get('/practice-music', function (req, res) {
      res.sendFile(__dirname + "/public/follow.html");
  });

  app.get('/logout', function (req, res) {
    if (req.session.user) {
      req.session.destroy(
        function (err) {
          if (err) {
            return;
          }
          //파일 지정시 제일 앞에 / 를 붙여야 root 즉 public 안에서부터 찾게 된다
          res.sendFile(__dirname + "/public/index.html");
        }
      );          //세션정보 삭제
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });
  //////////////// 데이터 전송 /////////////

  //후에 유저 데이터 전체를 전송 할 계획
  app.get('/present-user', function (req, res) {
    var user_id = req.session.user.id;
    let query = `SELECT * FROM study_db.user WHERE user_id = ${mysql.escape(user_id)} `;

    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });


  // 유저가 가진 악보리스트 전송
  app.get('/user_scoreList', function (req, res) {
    var user_id = req.session.user.id;
    let query = `SELECT * FROM study_db.usersheet WHERE user_id = ${mysql.escape(user_id)} `;

    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  app.get('/user-score', function (req, res) {
      res.sendFile(__dirname + "/user_scoreFile/Twinkle Twinkle Little Star.musicxml");
  });


  //다운로드 페이지에서 악보 파일 다운로드
  // INSERT 동작
  app.get('/score-down', function (req, res) {
    var socore_name = req.query.score_name;
    var user_id = req.session.user.id;

    if (socore_name) {
      var sheet_path = __dirname + "/user_scoreFile/" + user_id + "_" + socore_name + ".musicxml";
      var userInsert_query =
        `INSERT INTO usersheet (sheet_id,user_id  , sheet_name , sheet_path)
        VALUES ( (SELECT sheet_id FROM study_db.sheet where sheet_name = ${mysql.escape(socore_name)}),
        ${mysql.escape(user_id)} , ${mysql.escape(socore_name)} , ${mysql.escape(sheet_path)})`

      conn.query(userInsert_query).then(result => {
        var input = fs.createReadStream(__dirname + "/scoreFile/" + socore_name + ".musicxml");
        var output = fs.createWriteStream(sheet_path);
        input.pipe(output);
        res.sendFile(__dirname + "/public/Download.html");

      }).catch(err => {

        var input = fs.createReadStream(__dirname + "/scoreFile/" + socore_name + ".musicxml");
        var output = fs.createWriteStream(sheet_path);
        input.pipe(output);
        res.sendFile(__dirname + "/public/Download.html");

      });
    }
    else {
      res.sendFile(__dirname + "/public/Download.html");
    }
  });

  // 뮤즈스코어에서 파싱후 데이터 전송
  app.get('/scorelist', function (req, res) {
    var url = 'https://musescore.com/sheetmusic?sort=view_count&instruments=0&parts=1';
    var title = new Array();
    var rank = 5;  //5위까지 확인

    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        // 곡명 파싱
        for (var i = 0; i < rank; i++) {
          $('.node.node--type-score.node--view-mode-grid.col-ms-6.col-sm-3 > h2 > a').each(function () {
            var title_info = $(this);
            var title_info_text = title_info.text();
            title[i] = title_info_text;
            i++;
          })
        }
        res.send(title);
      }
    });
  });

  //////////// 사용자 관리 API ///////////////
  //로그인 동시에 세션유지 추가적으로 비밀번호,아이디 확인여부 필요
  app.post('/', function (req, res) {
    var ID = req.body['Username'];
    var PW = req.body['Password'];
    //res.send("아이디 "+req.body['Username']+ " 패스워드 "+req.body['Password'] );
    if (req.session.user) {
      console.log('이미 로그인 되어 있음');
      res.sendFile(__dirname + "/public/index-alt4.html");
    } else {
      req.session.user = {
        id: ID,
        pw: PW,
        authorized: true
      };
      console.log(ID + ' 로그인 성공');
      res.sendFile(__dirname + "/public/index-alt4.html");
    }
  });

  //세션유지 확인용
  app.get('/loginsession', function (req, res) {
    res.send(req.session.user.id);
  });

});

// 서버 오픈
app.set('port', 8000);
app.listen(app.get('port'), () => console.log("Conneted " + app.get('port') + " port"));