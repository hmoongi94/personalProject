export const load = function () {
  document.addEventListener('DOMContentLoaded', function () {
    const loginSubmit = document.getElementById('loginSubmit')
    const signupSubmit = document.getElementById('signupSubmit')
    
    // 여기서 AJAX 또는 Fetch API를 사용하여 서버로 데이터 전송
    // 서버에서 인증을 수행하고 적절한 응답을 처리
    loginSubmit.addEventListener("click", function () {
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      console.log(`Login: Email - ${email}, Password - ${password}`)
    })
    
    
    
    // 여기서 AJAX 또는 Fetch API를 사용하여 서버로 데이터 전송
    // 서버에서 회원가입 처리하고 적절한 응답을 처리
    signupSubmit.addEventListener("click", function () {
      const signupEmail = document.getElementById('signupEmail').value
      const signupPassword = document.getElementById('signupPassword').value
      console.log(`Sign Up: Email - ${signupEmail}, Password - ${signupPassword}`)
    })
    
    
  })
}