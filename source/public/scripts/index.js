const selColorStyle = document.querySelector('#sel-color-style');
const btnNewNote = document.querySelector('#btn-new-note');
const btnClosePopUp = document.querySelector('#btn-close-pop-up');

function toggleColorStyle(){
    document.body.classList.toggle('dark-mode');
}

function openNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'flex';
}

function closeNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'none';
}

selColorStyle.addEventListener('change', toggleColorStyle);
btnNewNote.addEventListener('click', openNewNotePopUp);
btnClosePopUp.addEventListener('click', closeNewNotePopUp);
