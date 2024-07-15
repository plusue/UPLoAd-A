document.addEventListener('DOMContentLoaded', (event) => {
    const note = document.getElementById('note');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');

    // Load saved note from localStorage
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
        note.value = savedNote;
    }

    // Save note to localStorage
    saveButton.addEventListener('click', () => {
        localStorage.setItem('note', note.value);
        alert('노트가 저장되었습니다.');
    });

    // Clear note
    clearButton.addEventListener('click', () => {
        note.value = '';
        localStorage.removeItem('note');
        alert('노트가 초기화되었습니다.');
    });
});
