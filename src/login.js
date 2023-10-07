const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { emitWarning } = require('process');
const app = express();
//mongodb 연결정보1
const mongo_url = "mongodb://127.0.0.1:27017/animal";
const animal_db = "animal";
const username = 'user';
const password = 'user';
const auth = { username: username, password: password };
let animalCollection;
let userCollection;
//, { auth: auth }
MongoClient.connect(mongo_url)
    .then(client => {
    console.log('MongoDB connected');
    const db = client.db(animal_db);
    animalCollection = db.collection('animals');
    userCollection = db.collection('user');
    console.log("mongo  연결");
})
    .catch(err => console.error("mongo 실패", err));

//monog session db 생성및 연결
const mongoStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost/sessiondb', // MongoDB 연결 URL
    collectionName: 'sessions', // 세션 컬렉션 이름
    ttl: 3600, // 세션 만료 시간 (초)
  });
  app.use(session({
    secret: 'mySecretKey', // 세션 암호화를 위한 시크릿 키
    resave: false, // 세션 변경 사항이 없어도 다시 저장하지 않음
    saveUninitialized: false, // 초기화되지 않은 세션도 저장
    store: mongoStore, // MongoDB 세션 저장소 설정
  })); 
  
// MySQL 연결 정보

const connection = mysql.createConnection({
    host     : 'db-test.coshf621ahrh.ap-northeast-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'leek1004',
    database : 'mydb6'
});


const corsOptions = {
    origin: 'http://localhost:9000',
    optionsSuccessStatus: 200 // 성공 응답 코드
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cors({
    credential: 'true'
}))


// MySQL 연결
connection.connect((error) => {
   
});

//사진업로드용 
try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}

const FileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
        req.fileValidationError = null;
        console.log(fileType)
        cb(null, true);
    } else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
        console.log("jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다. ",fileType)
        cb(null, false)
    }
}


const upload = multer(
    {
        dest: './uploads',
    }
)




//로그인 API
app.post('/api/login', (req, res) => {
    console.log('login man');
    console.log(req.body)
    const { username, password } = req.body;
    // MySQL 데이터베이스에서 사용자 정보를 확인합니다.
    connection.query('SELECT * FROM user WHERE userName = ? AND userPassword = ?', [username, password], (error, results) => {
        if (error) {
            console.error('MySQL 쿼리 오류:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else if (Array.isArray(results)) {
            // 사용자 정보가 없으면 로그인 실패 처리를 합니다.
            if (results.length === 0){
                console.log(username,password)
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
            else {
                // 로그인 성공 처리를 합니다.
                console.log(results)
                req.session.username = username
                req.session.userlevel = results[0].user_level
                res.json({ success: true, message: 'Login successful', user: username });
                
            }
        }
    });
});


//로그인 세션api
app.get('/api/checkLogin', (req, res) => {
    const  _id  = req.session;
    // 세션에 저장된 사용자 정보가 있는지 및 사용자 ID와 일치하는지 확인
    if (req.cookies.id === id) {
      res.status(200).json({ isLoggedIn: true });
    } else {
      res.status(200).json({ isLoggedIn: false });
    }
  });

//로그아웃
app.post('/api/logout', (req, res) => {
    // 세션을 파기하여 로그아웃 처리
    res.clearCookie('username');
  });

//회원가입 API
app.post('/api/signup', (req, res) => {
    console.log('signup man');
    console.log(req.body);
    const { user_id, user_pw, user_email, user_name, phone_number } = req.body;
    const user_lv =1
    // MySQL 데이터베이스에서 사용자 정보를 확인합니다.
    connection.query('SELECT * FROM user WHERE userName = ?', [user_id], (error, results) => {
        if (error) {
            console.error('MySQL 쿼리 오류:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else if (Array.isArray(results) && results.length != 0) {
            // 사용자 정보가 없으면 로그인 실패 처리를 합니다.
            res.status(401).json({ success: false, message: 'user_id is Exit' });
        }
        else {
            // 로그인 성공 처리를 합니다.
            try {
                // 새로운 사용자 추가
                connection.query(
                  `INSERT INTO user (userName, userPassword,user_level,user_email,name,phone_num) VALUES ('${user_id}', '${user_pw}', '${user_lv}', '${user_email}', '${user_name}', '${phone_number}')`
                );
                const animal_list = [];
                const post = { user_id: user_id, animals: animal_list };
                userCollection.insertOne(post);
                res.json({ success: true, message: 'regester successful', user: user_id });
            }
            catch (err) {
                console.error('MySQL 에러:', err);
                res.status(500).send('MySQL 에러');
            }
        }
    });
});



//다이어리 수정
//짐승추가
app.post('/api/diary/animal', upload.single('imgCrop'), (req, res) => {
    console.log('add animal');
    console.log(req.body)
    console.log(req.file)
    const { user_id, animal_name, birth,sex, data} = req.body;
    let img_list =[] 
    if (req.file != undefined){
      img_list.push(req.file.path)
    }
    userCollection.findOne({ user_id:  user_id, animals: animal_name })
    .then((check)=>{
        if (check != undefined ) {
            res.status(409).send('animal already exists');
            return;
        }
        else {
            userCollection.updateOne({ user_id:  user_id }, { $push: { animals: animal_name } })
                .catch((err) => {
                res.status(501).send('mongo error in update');
                console.log('mongo error in update', err);
                return;
            });
            
            const new_animal = { user_id:  user_id, name: animal_name, birth: birth,sex: sex, data: data ,imgCrop:img_list };
            animalCollection.insertOne(new_animal)
                .then(() => {
                res.status(201).send('animal add');
            }).catch((err) => {
                res.status(501).send('mongo error in add animal');
                console.log('mongo error in add animal', err);
                return
            });
        }
    })
    .catch((err) => {
        res.status(501).send('mongo error in find animal');
        console.log('mongo error in find animal', err);
        return;
    });

});

//짐승 무게 수정
app.put('/api/diary/animal/weight', (req, res) => {
    console.log('animal weight');
    console.log(req.body);
    const {  user_id, animal_name, weights } = req.body;
    userCollection.findOne({ user_id:  user_id, animals: animal_name  })
    .then((check)=>{
        if (check == null) {
            res.status(409).send('animal no exists');
            return;
        }
        else {
            animalCollection.updateOne({ user_id:  user_id, name: animal_name }, { $set: { "data.weights": weights } })
                .then(() => {
                res.status(200).send('animal weights update');
            }).catch((err) => {
                res.status(501).send('mongo error in update weights');
                console.log('mongo error in update weights', err);
            });
        }

    })
    .catch((err) => {
        res.status(501).send('mongo error in find animal');
        console.log('mongo error in find animal', err);
        return;
    });
    
});

//짐승 이벤트 수정
app.put('/api/diary/animal/event', (req, res) => {
    console.log('animal event');
    console.log(req.body);
    const {  user_id, animal_name, events } = req.body;
    userCollection.findOne({ user_id:  user_id, animals: animal_name  })
    .then((check)=>{
        if (check == null) {
            res.status(409).send('animal no exists');
            return;
        }
        else {
            animalCollection.updateOne({ user_id:  user_id, name: animal_name }, { $set: { "data.events": events } })
                .then(() => {
                res.status(200).send('animal events update');
            }).catch((err) => {
                res.status(501).send('mongo error in update events');
                console.log('mongo error in update events', err);
            });
        }
    })
    .catch((err) => {
        res.status(501).send('mongo error in find animal');
        console.log('mongo error in find animal', err);
        return;
    });
    
});

//짐승 생일 변경
app.put('/api/diary/animal/birth', (req, res) => {
    console.log('animal adjust birth');
    console.log(req.body);
    const {  user_id, animal_name, birth } = req.body;
    userCollection.findOne({ user_id:  user_id, animals: animal_name  })
    .then((check)=>{
        if (check == null) {
            res.status(409).send('animal no exists');
            return;
        }
        else {
            animalCollection.updateOne({ user_id:  user_id, name: animal_name }, { $set: { birth: birth } })
                .then(() => {
                res.status(200).send('animal birth update');
            }).catch((err) => {
                res.status(501).send('mongo error in update birth');
                console.log('mongo error in update birth', err);
            });
        }
    })
    .catch((err) => {
        res.status(501).send('mongo error in find animal');
        console.log('mongo error in find animal', err);
        return;
    });
    
});

//짐승 이미지 추가 여러개
app.post('/api/diary/animal/images', upload.array('imgCrop'), async (req, res) => {
    console.log('animal adjust image');
    console.log(req.body);
    const files = req.files
    const {  user_id, animal_name } = req.body;
    
    console.log( user_id, animal_name, files)
    // 업로드된 이미지 파일들
    try {
      const user = await userCollection.findOne({ user_id:  user_id });
      if (!user) {
        res.status(409).send('User does not exist');
        return;
      }
  
    const imagePaths = [];
      
    for (const file of files) {
      const imagePath = file.path; // 이미지 파일 경로
      imagePaths.push(imagePath);
      console.log(file.path)
      // 이미지 정보를 데이터베이스에 저장
      const animal = await animalCollection.updateOne(
        { user_id:  user_id, name: animal_name },
        { $push: { imgCrop: imagePath } }
      );
    }
  
      res.status(200).json({ success: true, imagePaths });
    } catch (err) {
      res.status(500).send('Server error');
      console.log('Error:', err);
    }
  });

//짐승 이미지 추가 1개
app.post('/api/diary/animal/image', upload.single('imgCrop,'), async (req, res) => {
    console.log('animal adjust image');
    console.log(req.body);
    console.log(req.file)
    const file = req.file
    const {  user_id, animal_name } = req.body;
    
    console.log( user_id, animal_name, file)
    // 업로드된 이미지 파일들
    try {
      const user = await userCollection.findOne({ user_id:  user_id });
      if (!user) {
        res.status(409).send('User does not exist');
        return;
      }
  
    const imagePaths = [];
      
   
    const imagePath = file.path; // 이미지 파일 경로
    imagePaths.push(imagePath);
    console.log(file.path)
    // 이미지 정보를 데이터베이스에 저장
    const animal = await animalCollection.updateOne(
        { user_id:  user_id, name: animal_name },
        { $push: { imgCrop: imagePath } }
    );
    
  
      res.status(200).json({ success: true, imagePaths });
    } catch (err) {
      res.status(500).send('Server error');
      console.log('Error:', err);
    }
  });

// 짐승 이미지 불러오기
app.get('/api/diary/animal/images', async (req, res) => {
    console.log('try get image');
    console.log(req.query);
    const {  user_id, animal_name } = req.query;
    console.log( user_id);

    try {
        const user_data = await userCollection.findOne({ user_id:  user_id });
        if (user_data === null) {
            console.log("no data");
            res.status(409).send('id not exists');
            return;
        } else {
            const animal_images= await animalCollection.findOne({ user_id:  user_id, name: animal_name });
            const images = [];
            for (const animal of animal_images.imgCrop) {
                console.log(animal)
                const data = await fs.promises.readFile(animal);
                images.push(data);
            }

            // 이미지 MIME 타입 설정
            res.setHeader('Content-Type', 'image/jpeg');
            
            for (const image of images) {
                res.write(image);
            }

            res.end();
        }
    } catch (err) {
        res.status(501).send('mongo error in find id');
        console.log('mongo error in find id', err);
        return;
    }
});

//짐승 삭제
app.delete('/api/diary/animal', (req, res) => {
    console.log('animal delete');
    console.log(req.body);
    const {  user_id, animal_name } = req.body;
    userCollection.findOne({ user_id:  user_id, animals: animal_name  })
    .then((check)=>{
        if (check == null) {
            res.status(409).send('animal no exists');
            return;
        }
        else {
            userCollection.updateOne({ user_id:  user_id }, { $pull: { animals: animal_name } })
                .catch((err) => {
                res.status(501).send('mongo error in update');
                console.log('mongo error in update', err);
                return;
            });
            animalCollection.deleteOne({ user_id:  user_id, name: animal_name })
                .then(() => {
                res.status(201).send('animal add');
            }).catch((err) => {
                res.status(501).send('mongo error in add animal');
                console.log('mongo error in add animal', err);
            });
        }
    })
    .catch((err) => {
        res.status(501).send('mongo error in find animal');
        console.log('mongo error in find animal', err);
        return;
    });
    
});


//짐승들 가져오기
app.get('/api/diary/animals', (req, res) => {
    console.log('dairy man');
    console.log(req.query);
    const {  user_id } = req.query;
    console.log( user_id)
    userCollection.findOne({ user_id:  user_id })
        .then((user_data) => {
        if (user_data == null) {
            console.log("no data fuck");
            res.status(409).send('id not exists');
            return;
        }
        else {
            const animals = animalCollection.find({ user_id:  user_id });
            img = fs.readFileSync(animals.imgCrop[0]);
            animals.imgCrop = img
            res.status(200).send(animals);
            return
        }
    })
        .catch((err) => {
        res.status(501).send('mongo error in find id');
        console.log('mongo error in find id', err);
        return;
    });
});


//짐승 가져오기
app.get('/api/diary/animal', async (req, res) => {
    console.log('dairy man');
    console.log(req.query);
    let { user_id, animal_name } = req.query;
    if(user_id  === '')
     user_id = '111'
    const result =  await userCollection.findOne({ user_id:  user_id })
    try{
        if(result != undefined)
        {  
          if(animal_name === undefined)
          {
            console.log(result)
            let animal_results =  await animalCollection.find({ user_id:  user_id }).toArray()
            if (animal_results != null) {
                for( let val in animal_results){
                

                if (Array.isArray(animal_results[val].imgCrop) && animal_results[val].imgCrop.length > 0) {
                    try {
                        const data = await fs.promises.readFile(animal_results[val].imgCrop[0]);
                        console.log(typeof(data));
                        animal_results[val].imgCrop = data;
                      } catch (err) {
                        console.error('파일 읽기 오류:', err);
                        animal_results[val].imgCrop = null;
                      }
                }
            }
            //console.log(animal_results)
            console.log(animal_results)
            return res.status(200).send(animal_results)
            
               


           }
           else {
               return res.status(409).send('animal not exists');
           }
           
           
          }
          else
          {
            animalCollection.findOne({ user_id:  user_id, name: animal_name })
             .then((results) => {
             if (results != null) {
                fs.readFile(results.imgCrop[0], 'utf8', (err, data) => {
                    if (err) {
                        results.imgCrop = null
                        return  res.status(200).send(results);
                    }
                    results.imgCrop = data
                    return  res.status(200).send(results);
                })
                 
             }
             else {  
                 return res.status(409).send('animal not exists');
             }
             })
             .catch((err) => {
             console.log('mongo error in find animal_name', err);
             return res.status(501).send('mongo error in find animal_name');
             })
            }
        }
        else
        {
            
            console.log('mongo error in find id', err);
            return res.status(501).send('mongo error in find id');;
        }
    }
    catch(err)
    {
        console.log(err.message)
        res.status(501).send('mongo error');
    }
        
    
    
    
    

});

//짐승 이름들만 가져오기 => 유저정보 가져오기
app.get('/api/diary/animals/name', (req, res) => {
    console.log('dairy man');
    console.log(req.query);
    const { user_id } = req.query;
    userCollection.findOne({ user_id:user_id})
    .then((results) => {
        if (results != null) {
            res.status(200).send(results);
        }
        else {
            res.status(409).send('user not exists');
        }
    })
    .catch((err) => {
        res.status(501).send('mongo error ');
        console.log('mongo error ', err);
        return;
    });

});


//짐승 이벤트만 가져오기
app.get('/api/diary/animal/event', (req, res) => {
    console.log('dairy man');
    console.log(req.query);
    const { user_id, animal_name } = req.query;
    userCollection.findOne({ user_id: user_id, animals: animal_name })
        .catch((err) => {
        res.status(501).send('mongo error in find id');
        console.log('mongo error in find id', err);
        return;
    });
    animalCollection.findOne({ user_id: user_id, name: animal_name })
        .then((results) => {
        var _a;
        if (results != null) {
            res.status(200).send((_a = results.data) === null || _a === void 0 ? void 0 : _a.events);
        }
        else {
            res.status(409).send('animal not exists');
        }
    })
        .catch((err) => {
        res.status(501).send('mongo error in find animal_name');
        console.log('mongo error in find animal_name', err);
        return;
    });
});

//짐승 무게만 가져오기
app.get('/api/diary/animal/weights', (req, res) => {
    console.log('dairy man');
    console.log(req.query);
    const { user_id, animal_name } = req.query;
    userCollection.findOne({ user_id: user_id, animals: animal_name })
        .catch((err) => {
        res.status(501).send('mongo error in find id');
        console.log('mongo error in find id', err);
        return;
    });
    animalCollection.findOne({ user_id: user_id, name: animal_name })
        .then((results) => {
        var _a;
        if (results != null) {
            res.status(200).send((_a = results.data) === null || _a === void 0 ? void 0 : _a.weights);
        }
        else {
            res.status(409).send('animal not exists');
        }
    })
        .catch((err) => {
        res.status(501).send('mongo error in find animal_name');
        console.log('mongo error in find animal_name', err);
        return;
    });
});

// 서버 실행
app.listen(3000, () => {
    console.log('서버 시작');
});
//# sourceMappingURL=login.js.map