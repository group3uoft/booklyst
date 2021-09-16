// function for mobile toggle 
export const mobileMenuToggle = () => {
  const navContainer = document.querySelector('.navbar');
  const navIcon = document.querySelector('#mobile-nav-icon');

  if(navContainer.className.includes('nav-hide')) {
    navContainer.classList.add('nav-show');
    navIcon.classList.add('nav-open');
    navContainer.classList.remove('nav-hide');
  } else {
    navIcon.classList.remove('nav-open');
    navContainer.classList.remove('nav-show');
    navContainer.classList.add('nav-hide');

  }
}