function submitForm() {
  // 폼 데이터 수집
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // 서버로 데이터 전송
  fetch('/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      // 성공 또는 실패에 따른 처리
      if (data.success) {
          alert('회원가입이 완료되었습니다.');
          // 다른 작업 수행 (예: 로그인 페이지로 이동)
      } else {
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
  })
  .catch(error => {
      console.error('에러 발생:', error);
      alert('서버 오류가 발생했습니다.');
  });
}