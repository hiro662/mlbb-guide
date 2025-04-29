let intervalId = 0;
const $scrollButton = document.querySelector('.scroll');
function scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 10000);
}
function scrollToTop() {
    intervalId = setInterval(scrollStep, 10);
}
$scrollButton.addEventListener('click', scrollToTop);
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) { 
        $scrollButton.style.display = 'block';
    } else {
        $scrollButton.style.display = 'none';
    }
});
const navLinks = document.querySelectorAll('header nav a'); // 元のセレクターに戻す
const contentLinks = document.querySelectorAll('a[href^="#"]'); // hrefが#で始まるすべてのリンクを選択
const contentSections = document.querySelectorAll('.content-section');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // デフォルトのジャンプは防ぐ
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // スムーズスクロールを追加
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // activeクラスの切り替え（既存の処理）
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            targetSection.classList.add('active');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// コンテンツ内のリンクにイベントリスナーを追加
contentLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // デフォルトの動作を防ぐ
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // セクション切り替えが必要なリンク（content-section内のIDへのリンク）のみ処理
            if (targetSection.classList.contains('content-section')) {
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                targetSection.classList.add('active');

                // ナビゲーションリンクのactiveクラスも更新
                navLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href').substring(1) === targetId) {
                    navLink.classList.add('active');
                }
            });
            } // Closing brace for if (targetSection.classList.contains('content-section'))
        }
    });
});


document.querySelectorAll('.youtube-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const playerDiv = this.closest('.youtube-card').querySelector('.youtube-player');
        const videoId = playerDiv.getAttribute('data-video-id');
        playerDiv.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        playerDiv.classList.add('active');
        this.style.display = 'none'; // サムネイルを非表示
    });
});