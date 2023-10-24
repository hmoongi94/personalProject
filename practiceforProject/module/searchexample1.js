const searchInput = document.getElementById('search-input');
const resultsList = document.getElementById('results');

// 가상의 운동 데이터 (운동명 배열)
const exerciseData = [
    '스쿼트',
    '푸시업',
    '크런치',
    '데드리프트',
    '벤치프레스',
    // 여기에 더 많은 운동 데이터를 추가하세요.
];

// 검색 기능 구현
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredExercises = exerciseData.filter(exercise => exercise.toLowerCase().includes(searchTerm));
    displayResults(filteredExercises);
});

// 검색 결과 표시
function displayResults(results) {
    resultsList.innerHTML = '';
    results.forEach(exercise => {
        const listItem = document.createElement('li');
        listItem.textContent = exercise;
        resultsList.appendChild(listItem);
    });
}