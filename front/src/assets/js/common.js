console.log("test");
const moreBtn = document.querySelector('.main__sub-description .btn-more-desc');
const description = document.querySelector('.main__sub-description span');
console.log(description);

moreBtn.addEventListener('click', () => {
    console.log(moreBtn);
    moreBtn
        .classList
        .toggle('clicked');
    description
        .classList
        .toggle('clamp');
});

const items = document.querySelectorAll(
    '.news .news-item .news-title-wrap .btn-more'
);
function openCloseAnswer() {
    const queId = document.querySelector('#' + this.id);
    const ansId = document.querySelector('#' + this.id.replace('que', 'ans'));
    queId
        .classList
        .toggle('clicked');
    ansId
        .classList
        .toggle('clamp');
}
items.forEach(item => item.addEventListener('click', openCloseAnswer));