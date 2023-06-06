const id = 'user1234@naver.com'; // 사용자 ID
const animalName = 'dog'; // 동물 이름

// API 요청 URL 생성
const url = `http://3.88.1.192:3000/api/diary/animal/images`;

// 이미지 요청 함수 정의
async function fetchImages() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                id: 'user1234@naver.com',
                animal_name: 'dog'
              }
        });
        if (response.ok) {
            const images = await response.json();
            console.log('Received images:', images);
            displayImages(images);
        } else {
            console.error('Failed to fetch images:', response.status);
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// 이미지 표시 함수 정의
function displayImages(images) {
    const container = document.getElementById('image-container');
    container.innerHTML = '';

    for (const imagePath of images) {
        const imgElement = document.createElement('img');
        imgElement.src = `http://3.88.1.192:3000${imagePath}`;
        container.appendChild(imgElement);
    }
}

// 이미지 요청 호출
fetchImages();