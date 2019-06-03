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
let moment = require('moment');
//아직 안쓴거
const http = require('http');
var xml = require('xml');

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

  // 메인페이지 자체적으로 로그인 검사함
  app.get('/main', function (req, res) {
    if (req.session.user) {
      res.sendFile(__dirname + "/public/index-alt4.html");
    } else {
      res.sendFile(__dirname + "/public/index.html");
    }
  });

  // 커뮤니티
  // community?page=:1
  app.get('/community', function (req, res) {
    res.sendFile(__dirname + "/public/Community_main.html");
  });

  // 마이페이지
  app.get('/mypage', function (req, res) {
    res.sendFile(__dirname + "/public/Mypage.html");
  });

  // 게시글 조회
  app.get('/post_view', function (req, res) {
    res.sendFile(__dirname + "/public/Community_postView.html");
  });

  //연습페이지 전송
  app.get('/practice-music', function (req, res) {
    res.sendFile(__dirname + "/public/follow.html");
  });

  //searchplease?sheet_name
  app.get('/searchplease', function (req, res) {
    //var sheet_name = req.query.sheet_name;
    res.sendFile(__dirname + "/public/search.html");
  });

  //로그아웃
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

  //////////////// 데이터 전송 /////////////////

  //////////// 게시판 관리 API /////////////////

  //해당 페이지의 게시글 리스트 전송 post-list?page=1 (get)

  app.get('/postMain', function (req, res) {
    
    let query = `SELECT * FROM study_db.post ORDER BY post_id DESC`;
    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  app.get('/postView', function (req, res) {
    var post_id = req.query.post_id;
    console.log(post_id);
    let query = `SELECT * FROM study_db.post WHERE post_id = ${mysql.escape(post_id)}`;
    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  app.get('/user-postList', function (req, res) {
    var user_id = req.session.user.id;
    
    let query = `SELECT * FROM study_db.post WHERE user_id=${mysql.escape(user_id)}`;
    conn.query(query).then(data => {
      
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });
  

  //게시글 작성
  app.post('/postWrite', function (req, res) {
    var content = req.body['bbsContent'];
    var title = req.body['bbsTitle'];
    var userid = req.session.user.id;
    var time = moment().format("YYYY년 MM월 DD일");
    var date = new Date();
    var insert_query = `INSERT INTO study_db.post (user_id, post_name, post_data, post_date)
    VALUES (${mysql.escape(userid)}, ${mysql.escape(title)}, ${mysql.escape(content)}, ${mysql.escape(time)});`;

    conn.query(insert_query).then(result => {
      console.log("성공");
      res.sendFile(__dirname + "/public/Community_main.html");
    })
  });

  //게시글 id 에 맞는 게시글 전송 post-view?post_id=1 (get)

  //게시글에 전체 댓글 출력
  app.get('/post_review', function (req, res) {
    var post_id = req.query.post_id;
    
    let query = `SELECT * FROM study_db.userreview WHERE post_id=${mysql.escape(post_id)}`;
    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  //댓글 작성 write-review (post)
  app.post('/review_write', function (req, res) {
    
    var post_id = req.body['post_id'];
    var content = req.body['COMMENT'];
    var userid = req.session.user.id;
    var time = moment().format("YYYY년 MM월 DD일");
    
    var insert_query = `INSERT INTO study_db.userreview (user_id, post_id, review_description, review_date)
    VALUES (${mysql.escape(userid)}, ${mysql.escape(post_id)}, ${mysql.escape(content)}, ${mysql.escape(time)});`;

    console.log(req.body);

    conn.query(insert_query).then(result => {

      console.log("성공");
      res.send("Success");
    }).catch(err => {
      console.log(err);
      res.send('fail');
    });
  });

  //search-sheet?sheet_name=Twinkle Twinkle Little Star

  app.get('/search-sheet', function (req, res) {
    let query = `SELECT * FROM study_db.sheet WHERE sheet_name = '${req.query.sheet_name}' `;
    conn.query(query).then(data => {
      if (data.length > 0) {
        console.log("요청 성공 :" + req.query.sheet_name);
        res.send(req.query.sheet_name);
      }
      else {
        console.log("요청 실패");
        res.send('fail');
      }
    }).catch(err => {
      console.log("에러");
      res.send('fail');
    });
  });


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
  app.get('/user-scoreList', function (req, res) {
    var user_id = req.session.user.id;
    let query = `SELECT * FROM study_db.usersheet WHERE user_id = ${mysql.escape(user_id)} ORDER BY user_sheet_id DESC`;
    conn.query(query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  // 선택된 유저 악보 전송
  app.get('/user-score', function (req, res) {
    var my_socore_name = req.query.score_name;
    var xml = fs.readFileSync(__dirname + "/user_scoreFile/" + my_socore_name + ".musicxml", 'utf-8');
    res.send(xml);
  });

  app.get('/sort_scoreList', function (req, res) {
    //var user_id = req.session.user.id;
    let query = `SELECT * FROM study_db.usersheet  ORDER BY user_sheet_id DESC LIMIT 5`;
    conn.query(query).then(data => {
      //console.log(data);
      res.send(data)
    }).catch(err => {
      res.send('fail');
    });
  });

  //다운로드 페이지에서 악보 파일 다운로드
  // INSERT 동작
  app.get('/score-down', function (req, res) {

    var socore_name = req.query.score_name;
    var user_id = req.session.user.id;
    var time = moment().format("YYYY년 MM월 DD일");

    if (socore_name) {
      var sheet_path = __dirname + "/user_scoreFile/" + user_id + "_" + socore_name + ".musicxml";
      var userInsert_query =
        `INSERT INTO usersheet (sheet_id, user_id  , sheet_name ,insert_time)
        VALUES ( (SELECT sheet_id FROM study_db.sheet where sheet_name = ${mysql.escape(socore_name)}),
         ${mysql.escape(user_id)} , ${mysql.escape(socore_name)},${mysql.escape(time)})`

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
      // 최초 접속의 경우 INSERT 동작 없이 페이지만 띄워준다.
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

  app.post('/login', function (req, res) {
    var ID = req.body['id'];
    var PW = req.body['pw'];


    let query = `SELECT * FROM study_db.user 
    WHERE user_id = ${mysql.escape(ID)} AND user_password = ${mysql.escape(PW)}`;
    conn.query(query).then(data => {
      console.log(data);
      if (data.length > 0) {
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
      }
      else {
        console.log(ID + ' 로그인 실패');
        res.sendFile(__dirname + "/public/failedLogin.html");
      }
    }).catch(err => {
      res.send(err);
    });
  });

  app.post('/signUp', function (req, res) {

    var user_id = req.body['user_id'];
    var user_password = req.body['user_password'];
    var user_name = req.body['user_name'];
    var user_birth = req.body['user_birth'];
    var user_phoneNumber = req.body['user_phoneNumber'];

    let q = `SELECT * FROM study_db.user WHERE user_id = ${mysql.escape(user_id)}`;

    conn.query(q).then(data => {

      // 이미 회원가입 된 사용자가 있을경우
      if (data.length > 0) {
        console.log("이미사용자가있음");
        res.sendFile(__dirname + "/public/failedJoin.html");

      } else {
        console.log("회원가입된 사용자 없음");
        let query = `insert into study_db.user 
        (user_id,user_password,user_name,user_birth,user_phoneNumber) VALUES 
        (${mysql.escape(user_id)},${mysql.escape(user_password)},${mysql.escape(user_name)},${mysql.escape(user_birth)},${mysql.escape(user_phoneNumber)})`;
        conn.query(query).catch(err =>
          res.sendFile(__dirname + "/public/failedJoin.html")
        ).then(result => {
          res.sendFile(__dirname + "/public/index.html");
        });
      }
    });
  });


  //세션유지 확인용
  app.get('/loginsession', function (req, res) {
    res.send(req.session.user.id);
  });

});

// 서버 오픈
app.set('port', 8000);
app.listen(app.get('port'), () => console.log("Conneted " + app.get('port') + " port"));