// 1. Swiper Initialization (Gallery Screen 4)
var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    rotate: true,
    slideShadows: true,
});

// 2. Navigation Function (Smooth Fade & Display Toggle)
function nextScreen(idx) {
    const current = document.getElementById(`screen-${idx}`);
    const nextIdx = idx + 1;
    const nextEl = document.getElementById(`screen-${nextIdx}`);
    
    if(current) {
        // Current screen ko fade out karo
        current.style.opacity = '0';
        
        setTimeout(() => {
            current.classList.remove('active');
            current.style.display = 'none';
            
            if(nextEl) {
                // Agli screen setup
                nextEl.style.display = 'flex';
                nextEl.style.opacity = '0';
                
                // Choti si delay taaki opacity transition trigger ho sake
                setTimeout(() => {
                    nextEl.classList.add('active');
                    nextEl.style.opacity = '1';
                }, 50);

                // Agar screen 4 (Gallery) load ho rahi hai toh swiper refresh karo
                if(nextIdx === 4) {
                    setTimeout(() => { swiper.update(); }, 300);
                }
            }
        }, 500); // 0.5s transition time (CSS se match karta hua)
    }

    // Music control - Screen 1 ke baad play hoga
    if (idx === 1) {
        const music = document.getElementById('bg-music');
        if(music) {
            music.play().catch(e => console.log("Music auto-play blocked by browser."));
        }
    }

    // Final Screen Celebration (Screen 9)
    if (nextIdx === 9) {
        startTimedConfetti(4000);
    }
}

// 3. Cake Logic (Screen 6)
function lightCandle() {
    const flame = document.getElementById('candle-flame');
    const instruction = document.getElementById('cake-instruction');
    const btnLight = document.getElementById('btn-light');
    const btnBlow = document.getElementById('btn-blow');

    if(flame) flame.classList.remove('hidden');
    if(instruction) instruction.innerText = "Wishes maang lo! ✨";
    if(btnLight) btnLight.classList.add('hidden');
    if(btnBlow) btnBlow.classList.remove('hidden');
}

function blowCandle() {
    const flame = document.getElementById('candle-flame');
    const btnBlow = document.getElementById('btn-blow');
    const btnNext = document.getElementById('go-to-letter');

    if(flame) flame.classList.add('hidden');
    if(btnBlow) btnBlow.classList.add('hidden');
    
    // Cake phoonkne par confetti blast
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff477e', '#ffb6c1', '#ffffff']
    });
    
    setTimeout(() => {
        if(btnNext) btnNext.classList.remove('hidden');
    }, 800);
}

// 4. Confetti Loop Function
function startTimedConfetti(duration) {
    let end = Date.now() + duration;
    (function frame() {
        // Left side blast
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff477e', '#ffd700']
        });
        // Right side blast
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff477e', '#ffd700']
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}