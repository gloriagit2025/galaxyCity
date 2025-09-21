if(localStorage.getItem('user')){
  document.getElementById('loginStatus').innerHTML='<a class="login-status" href="profile.html" >會員中心</a> \
  | <a class="login-status" onclick="logout()" >登出</a>';
  
  document.getElementById('loginStatusCol').innerHTML='<a class="login-status" href="profile.html" >會員中心</a> \
  | <a class="login-status" onclick="logout()" >登出</a>';
}else{
    document.getElementById('loginStatus').innerHTML='<a href="login.html">登入</a> | <a href="register.html">註冊</a>';
    document.getElementById('loginStatusCol').innerHTML='<a href="login.html">登入</a> | <a href="register.html">註冊</a>';
}



function logout() {
    localStorage.removeItem("user");
   document.getElementById('loginStatus').innerHTML='<a href="login.html">登入</a> | <a href="register.html">註冊</a>';
   document.getElementById('loginStatusCol').innerHTML='<a  href="login.html">登入</a> | <a href="register.html">註冊</a>';
}