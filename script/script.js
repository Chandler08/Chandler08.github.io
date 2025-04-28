
function updateProgressBar(progress) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    if (progress >= 0 && progress <= 100) {
        progressBar.style.width = progress + '%';
        progressText.textContent = `Postęp: ${progress}%`;
    } else {
        progressBar.style.width = 100 + '%';
        progressText.textContent = `Postęp: 100%`;
    }
}

let progress = 90; 
updateProgressBar(progress);


