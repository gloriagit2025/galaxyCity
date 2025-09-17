if(localStorage.getItem('user')){
   document.querySelector('.logined').style.display='flex';
   
   document.querySelector('.unlogined').style.display='none';

}



function logout() {
    localStorage.removeItem("user");
    document.querySelector('.logined').style.display='none';
   document.querySelector('.unlogined').style.display='flex';
    window.location.href = '/galaxyCity/login.html';
}