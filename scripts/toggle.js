var randForm;
var navLinks;

function setTheme(theme) {
    if (theme === 'evil'){
        document.body.style.backgroundColor = "var(--darkbackground)";
        randForm.style.setProperty('background-color', 'var(--darkformbackground)');
        randForm.style.setProperty('color', 'var(--darkformtext)');
        navLinks.style.setProperty('color', 'var(--darkexit)');
    }
    else{
        document.body.style.backgroundColor = "var(--lightbackground)";
        randForm.style.setProperty('background-color', 'var(--lightformbackground)');
        randForm.style.setProperty('color', 'var(--lightformtext)');
        navLinks.style.setProperty('color', 'var(--lightexit)');
    }
}
function toggleTheme()
{
    const currTheme = localStorage.getItem('theme') || 'good';
    const newTheme = currTheme === 'good'? 'evil': 'good';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
}

function setSavedTheme() {
    randForm = document.getElementById("random-form");
    navLinks = document.querySelector('nav > a');
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) {
        setTheme(savedTheme);
        document.getElementById('themeToggle').checked = (savedTheme === 'evil');
    }
}

document.addEventListener('DOMContentLoaded', setSavedTheme);