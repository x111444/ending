const axios = require("axios");
const fs = require("fs");
/*
확인된 문제
1.동시에 명령 떨어질때 명령어 씹힘 현상 발생 실사용시 발생 확률 낮음
2.get 명령 문제 해결 필요
*/


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
    weights: [20, 22, 21]
}).then((rep)=>{
  console.log("add animal weight is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/weight', {
    id: 'user1234@naver.com',
    animal_name: 'cat',
    weights: [5, 6, 7]
}).then((rep)=>{
  console.log("add animal weight is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/event', {
    id: 'user1234@naver.com',
    animal_name: 'dog',
    events: ['vaccination', 'grooming']
}).then((rep)=>{
  console.log("add animal event is clear ")
}).catch((err) => {
  console.log(err.response.data)
});

axios.put('http://3.88.1.192:3000/api/diary/animal/event', {
    id: 'user1234@naver.com',
    animal_name: 'cat',
    events: ['vaccination', 'grooming']
  }).then((rep)=>{
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


/*
axios.delete('http://3.88.1.192:3000/api/diary/animal', {
    data: {
      id: 'user1234@naver.com',
      animal_name: 'dog'
    }
  });
*/
