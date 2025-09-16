document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('searchInput');
    const qrContainer = document.querySelector('.qr-container');
    const form = document.querySelector('.search-form');

    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');

// Страница index.html
if (input && form) {
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    const norm = tryParse(raw) || tryParse('https://' + raw);
    if (!norm) {
        alert('Введите ссылку!');
        input.focus();
        return;
    }
    const target = 'qr.html?data=' + encodeURIComponent(norm);
    window.location.href = target;
    });
}

// Страница qr.html
if (qrContainer) {
    const params = new URLSearchParams(window.location.search);
    const text = (params.get('data') || '').trim();
    new QRCode(qrContainer, {
    text: text,
    width: 200,
    height: 200
    });
}

function tryParse(page) {
    try {
        const url = new URL(page);
        const host = url.hostname;
        if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
        if (host === 'localhost' || (host.includes('.') && (!host.endsWith('.')))) return url.toString();
        return null;
    } catch {
        return null;
    }
}

function download() {
    const img = qrContainer.querySelector('img');
    const a = document.createElement('a');
    a.href = img.src;
    a.download = 'qr.png';
    a.click();
}

function share() {
    navigator.clipboard.writeText(location.href)
    .then(() => alert('Ссылка скопирована'))
    .catch(() => alert('Не удалось скопировать ссылку'));
} 

downloadBtn.addEventListener('click', download);
shareBtn.addEventListener('click', share);
});
