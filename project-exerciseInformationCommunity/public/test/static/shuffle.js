const studentList = [
  "김우진",
  "김현",
  "방승희",
  "변호녕",
  "소사무엘",
  "송영준",
  "신동현",
  "오승민",
  "유승민",
  "윤준현",
  "이민구",
  "이유안",
  "이은정",
  "정영식",
  "최성민",
  "최은철",
  "홍문기"
];
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledArray = shuffleArray(studentList);
console.log(shuffledArray);

function createTeams(array) {
  const shuffled = shuffleArray(array);
  const teams = [
    shuffled.slice(0, 4),
    shuffled.slice(4, 8),
    shuffled.slice(8, 12),
    shuffled.slice(12)
  ];

  teams.forEach(team => {
    if (team.length > 0) {
      team[0] = '팀장-' + team[0];
    }
  });

  return teams;
}
const teams = createTeams(shuffledArray);
console.log(teams);