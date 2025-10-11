
const pageData = {
    title: "Authentic Batana Oil. Trusted Quality. Beautiful Results.",
    cards: [
        {
            title: "Trusted & Authentic",
            description: "Handcrafted with care and rooted in tradition, our Batana oil comes straight from its native source. Loved by generations, it's a time-honored secret for naturally beautiful hair.",
            poster: "//botanixhair.com/cdn/shop/files/preview_images/ccbad0ee708d471a94769270e9832410.thumbnail.0000000000.jpg?v=1753511931",
            videoSources: {
                m3u8: "//botanixhair.com/cdn/shop/videos/c/vp/ccbad0ee708d471a94769270e9832410/ccbad0ee708d471a94769270e9832410.m3u8?v=0",
                mp4: "//botanixhair.com/cdn/shop/videos/c/vp/ccbad0ee708d471a94769270e9832410/ccbad0ee708d471a94769270e9832410.HD-720p-4.5Mbps-52190906.mp4?v=0"
            }
        },
        {
            title: "100% Pure Ingredients",
            description: "No fillers and no additives. Just pure, wild-harvested Batana oil in every drop. It's nature's remedy, untouched and packed with powerful benefits for your hair and scalp.",
            poster: "//botanixhair.com/cdn/shop/files/preview_images/93db9b29abee44e5b77cdbf63d3c4cb2.thumbnail.0000000000.jpg?v=1753511931",
            videoSources: {
                m3u8: "//botanixhair.com/cdn/shop/videos/c/vp/93db9b29abee44e5b77cdbf63d3c4cb2/93db9b29abee44e5b77cdbf63d3c4cb2.m3u8?v=0",
                mp4: "//botanixhair.com/cdn/shop/videos/c/vp/93db9b29abee44e5b77cdbf63d3c4cb2/93db9b29abee44e5b77cdbf63d3c4cb2.HD-720p-4.5Mbps-52190908.mp4?v=0"
            }
        },
        {
            title: "Deeply Nourishes & Restores",
            description: "Bring your hair back to life with rich hydration and essential nutrients. Our Batana oil repairs damage, strengthens strands, and leaves your hair soft, shiny, and full of vitality.",
            poster: "//botanixhair.com/cdn/shop/files/preview_images/425c003b8a194330883b569ca0b3ff97.thumbnail.0000000000.jpg?v=1753512381",
            videoSources: {
                m3u8: "//botanixhair.com/cdn/shop/videos/c/vp/425c003b8a194330883b569ca0b3ff97/425c003b8a194330883b569ca0b3ff97.m3u8?v=0",
                mp4: "//botanixhair.com/cdn/shop/videos/c/vp/425c003b8a194330883b569ca0b3ff97/425c003b8a194330883b569ca0b3ff97.HD-720p-4.5Mbps-52192676.mp4?v=0"
            }
        }
    ]
};
let currentIndex = 0;
let isMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        renderPage(); // 重新渲染页面
    }
});
function createCard(cardData) {
    return `
        <div style="background-image: linear-gradient(rgba(18, 18, 18, 0.04), rgba(18, 18, 18, 0.04)); border-radius: 24px; overflow: hidden;">
            <div>
                <internal-video class="internal-video" data-autoplay="true">
                    <video width="100%" height="auto" preload="metadata"
                        poster="${cardData.poster}"
                        muted="" autoplay="" loop="" playsinline="" disablepictureinpicture="">
                        <source type="application/x-mpegURL"
                            src="${cardData.videoSources.m3u8}">
                        <source type="video/mp4"
                            src="${cardData.videoSources.mp4}">
                    </video>
                </internal-video>
            </div>
            <div style="padding: 25px">
                <h3 style="font-size: 24px; font-weight: 700;">${cardData.title}</h3>
                <div style="margin-top: 1rem; color: rgb(18, 18, 18, .9);">
                    <p>${cardData.description}</p>
                </div>
            </div>
        </div>
    `;
}

function createSwiperControls() {
    return `
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 30px;">
            <button id="prevBtn" style="
                background: rgba(18, 18, 18, 0.1);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='rgba(18, 18, 18, 0.2)';" onmouseout="this.style.background='rgba(18, 18, 18, 0.1)';">
                ←
            </button>
            <div id="pagination" style="display: flex; gap: 8px;">
                ${pageData.cards.map((_, index) => `
                    <div class="dot" data-index="${index}" style="
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: ${index === currentIndex ? 'rgba(18, 18, 18, 0.8)' : 'rgba(18, 18, 18, 0.3)'};
                        cursor: pointer;
                        transition: background 0.3s ease;
                    "></div>
                `).join('')}
            </div>
            <button id="nextBtn" style="
                background: rgba(18, 18, 18, 0.1);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: background 0.3s ease;
            " onmouseover="this.style.background='rgba(18, 18, 18, 0.2)';" onmouseout="this.style.background='rgba(18, 18, 18, 0.1)';">
                →
            </button>
        </div>
    `;
}

function updateSwiper() {
    const track = document.getElementById('swiperTrack');
    const dots = document.querySelectorAll('.dot');
    
    if (track) {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    if (dots) {
        dots.forEach((dot, index) => {
            dot.style.background = index === currentIndex ? 'rgba(18, 18, 18, 0.8)' : 'rgba(18, 18, 18, 0.3)';
        });
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % pageData.cards.length;
    updateSwiper();
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + pageData.cards.length) % pageData.cards.length;
    updateSwiper();
}

function renderPage() {
    const body = document.querySelector('.modules__index');
    const container = document.createElement('div');
    container.style.margin = '0 auto';
    container.style.padding = '36px 50px';
    container.style.width = 'fit-content';
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '1300px';
    const title = document.createElement('h2');
    title.style.textAlign = 'center';
    title.style.fontSize = '39px';
    title.style.fontWeight = '700';
    title.style.marginBottom = '30px';
    title.textContent = pageData.title;
    
    if (isMobile) {
        const swiperContainer = document.createElement('div');
        swiperContainer.style.overflow = 'hidden';
        swiperContainer.style.width = '100%';
        swiperContainer.style.margin = '0 auto';
        swiperContainer.style.position = 'relative';
        
        const track = document.createElement('div');
        track.id = 'swiperTrack';
        track.style.display = 'flex';
        track.style.transition = 'transform 0.3s ease';
        
        pageData.cards.forEach(cardData => {
            const slide = document.createElement('div');
            slide.style.width = '100%';
            slide.style.flexShrink = '0';
            slide.style.minWidth = '100%';
            slide.innerHTML = createCard(cardData);
            track.appendChild(slide);
        });
        
        swiperContainer.appendChild(track);
        swiperContainer.addEventListener('touchstart', handleTouchStart, false);
        swiperContainer.addEventListener('touchend', handleTouchEnd, false);
        
        wrapper.appendChild(title);
        wrapper.appendChild(swiperContainer);
        const controlsDiv = document.createElement('div');
        controlsDiv.innerHTML = createSwiperControls();
        wrapper.appendChild(controlsDiv.firstElementChild);
        setTimeout(() => {
            document.getElementById('prevBtn').addEventListener('click', prevSlide);
            document.getElementById('nextBtn').addEventListener('click', nextSlide);
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSwiper();
                });
            });
        }, 0);
        
    } else {
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        grid.style.gap = '40px';
        
        pageData.cards.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = createCard(cardData);
            grid.appendChild(cardElement.firstElementChild);
        });
        
        wrapper.appendChild(title);
        wrapper.appendChild(grid);
    }
    
    container.appendChild(wrapper);
    body.appendChild(container);
}

let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide(); 
    }
}

document.addEventListener('DOMContentLoaded', renderPage);