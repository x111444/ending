const axios = require("axios");
const fs = require("fs");
const moment = require('moment');
/*
확인된 문제
1.동시에 명령 떨어질때 명령어 씹힘 현상 발생 실사용시 발생 확률 낮음
2.get 명령 문제 해결 필요
*/

/*
axios.post('http://3.88.1.192:3000/api/diary/animal', {
      id: 'user1234@naver.com',
      animal_name: 'dog',
      birth: '2020-01-01',
      data: {}
}).then((rep)=>{
  console.log("add animal is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

 axios.post('http://3.88.1.192:3000/api/diary/animal', {
    id: 'user1234@naver.com',
    animal_name: 'cat',
    birth: '2020-01-01',
    data: {}
}).then((rep)=>{
  console.log("add animal is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/weight', {
  id: 'user1234@naver.com',
  animal_name: 'dog',
  weights: [
    { date: moment('2023-06-01').format('YYYY-MM-DD'), value: 20 },
    { date: moment('2023-06-02').format('YYYY-MM-DD'), value: 22 },
    { date: moment('2023-06-03').format('YYYY-MM-DD'), value: 21 }
  ]
}).then((rep) => {
  console.log("add animal weight is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/weight', {
  id: 'user1234@naver.com',
  animal_name: 'cat',
  weights: [
    { date: moment('2023-06-01').format('YYYY-MM-DD'), value: 5 },
    { date: moment('2023-06-02').format('YYYY-MM-DD'), value: 6 },
    { date: moment('2023-06-03').format('YYYY-MM-DD'), value: 7 }
  ]
}).then((rep) => {
  console.log("add animal weight is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/event', {
  id: 'user1234@naver.com',
  animal_name: 'dog',
  events: [
    { date: moment('2023-06-01').format('YYYY-MM-DD'), value: 'vaccination' },
    { date: moment('2023-06-02').format('YYYY-MM-DD'), value: 'grooming' }
  ]
}).then((rep) => {
  console.log("add animal event is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/event', {
  id: 'user1234@naver.com',
  animal_name: 'cat',
  events: [
    { date: moment('2023-06-01').format('YYYY-MM-DD'), value: 'vaccination' },
    { date: moment('2023-06-02').format('YYYY-MM-DD'), value: 'grooming' }
  ]
}).then((rep) => {
  console.log("add animal event is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/birth', {
    id: 'user1234@naver.com',
    animal_name: 'dog',
    birth: '2021-01-01'
}).then((rep)=>{
  console.log("add animal birth is clear ")
}).catch((err) => {
  console.log(err.response.data)
});


axios.put('http://3.88.1.192:3000/api/diary/animal/birth', {
    id: 'user1234@naver.com',
    animal_name: 'cat',
    birth: '2021-01-01'
}).then((rep)=>{
  console.log("add animal birth is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/birth', {
    id: 'user1234@naver.com',
    animal_name: 'cat',
    birth: '2021-01-01'
}).then((rep)=>{
  console.log("add animal birth is clear ")
}).catch((err) => {
  console.log(err.response.data)
});;



//get
axios.get('http://3.88.1.192:3000/api/diary/animals', {
        params: {
            id: 'user1234@naver.com'
        }
    })
    .then((rep) => {
        console.log(rep.data);
    })
    .catch((err) => {
        console.log(err.response.data);
    });


axios.get('http://3.88.1.192:3000/api/diary/animal', {
      params: {
        id: 'user1234@naver.com',
        animal_name: 'cat'
      }
    })
    .then((rep) => {
      console.log(rep.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
*/
//로그인 관련

axios.post('http://3.88.1.192:3000/api/login', { 
      username: 'user1234@naver.com',
      password: '10200411'
      })
    .then(response => {
      const data = response.data;
      if (data.success) {
        // 로그인 성공
        console.log(`로그인 성공: 사용자 ${data.user}`);
        // 세션 등의 로그인 관련 처리를 진행합니다.
        
      } else {
        // 로그인 실패
        console.log('로그인 실패:', data.message);
        // 실패에 따른 처리를 수행합니다.
      }
    })
    .catch(error => {
      console.error('로그인 요청 에러: ',error);
      // 에러 처리를 수행합니다.
  });


  axios.get('http://3.88.1.192:3000/api/checkLogin', {
    params: {
      id: 'user1234@naver.com'
    },
  })
  .then(response => {
    const data = response.data;
    if (data.isLoggedIn) {
        // 로그인 상태인 경우에 대한 처리
        console.log('사용자는 로그인 상태입니다.');
    }else {
        // 로그아웃 상태인 경우에 대한 처리
        console.log('사용자는 로그아웃 상태입니다.');
      }
    })
    .catch(error => {
      console.error('로그인 상태 조회 중 에러 발생:', error);
    });

/*
axios.get('http://3.88.1.192:3000/api/diary/animal/event', {
  params: {
    id: 'user1234@naver.com',
    animal_name: 'cat'
  }
}).then((rep)=>{
  console.log(rep.data);
}).catch((err) => {
  console.log(err.response.data);
});

axios.get('http://3.88.1.192:3000/api/diary/animal/weights', {
  params: {
    id: 'user1234@naver.com',
    animal_name: 'cat'
  }
}).then((rep)=>{
  console.log(rep.data);
}) .catch((err) => {
  console.log(err.response.data);
});



//img
const imagePath1 = "test/test1.PNG";
const imagePath2 = "test/test2.PNG";
const formData = new FormData();
formData.append('id', 'user1234@naver.com');
formData.append('animal_name', 'dog');
formData.append('file', fs.createReadStream(imagePath1));
//formData.append('files', fs.createReadStream(imagePath2));

axios.post('http://3.88.1.192:3000/api/diary/animal/image', formData, {headers: {
  'Content-Type': 'multipart/form-data',
}})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.response.data);
  });

  axios.get('http://3.88.1.192:3000/api/diary/animal/images', {
    params: {
      id: 'user1234@naver.com',
      animal_name: 'dog'
    }
  })
  .then((rep) => {
    console.log(rep.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });


/*
axios.delete('http://3.88.1.192:3000/api/diary/animal', {
    data: {
      id: 'user1234@naver.com',
      animal_name: 'dog'
    }
  });
*/
