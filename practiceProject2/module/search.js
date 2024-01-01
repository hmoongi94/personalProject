const data = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Mango",
  "Pineapple",
  "Strawberry"
];

function search(query) {
  return data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// 검색어 입력 필드와 결과 목록 가져오기
const searchInput = document.getElementById('searchInput');
const resultList = document.getElementById('resultList');

// 검색어 입력 시 이벤트 처리
searchInput.addEventListener('input', function () {
  const query = searchInput.value;
  const results = search(query);

  // 결과 목록 업데이트
  displayResults(results);
});

// 결과를 목록에 표시하는 함수
function displayResults(results) {
  // 목록 비우기
  resultList.innerHTML = '';

  // 결과 표시
  results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = result;
      resultList.appendChild(listItem);
  });
}