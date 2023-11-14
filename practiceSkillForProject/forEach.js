const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function (currentValue, index, array) {
  // currentValue: 현재 순회 중인 요소의 값
  // index: 현재 순회 중인 요소의 인덱스
  // array: 원본 배열

  array[index] = currentValue + 1;
});

console.log(numbers); // [2, 3, 4, 5, 6]