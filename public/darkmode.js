let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
};

// Apply theme without transition on page load
if (darkmode === 'active') {
  document.body.classList.add('darkmode');
}
document.documentElement.classList.add('no-transition');
document.body.classList.add('no-transition');

// Remove the no-transition class after a short delay
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.classList.remove('no-transition');
    document.body.classList.remove('no-transition');
  }, 0);
});

themeSwitch.addEventListener('click', () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
});
