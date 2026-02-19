const trigger = document.getElementById('sketchbook-trigger');
const pcPrompt = document.getElementById('pc-image-prompt');
const overlay = document.getElementById('overlay');
const bookContainer = document.getElementById('sketchbook-container');
const room = document.getElementById('room');
const exitZone = document.getElementById('exit-zone');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const pageImg = document.getElementById('page-img');

let currentPage = 0; 
const totalPages = 5;

function updatePage() {
    // Fade out
    pageImg.style.opacity = "0";

    setTimeout(() => {
        if (currentPage === 0) {
            pageImg.src = "sketchcover.png";
        } else {
            pageImg.src = "sketchpages" + currentPage + ".png";
        }

        // Fade back in
        pageImg.style.opacity = "1";

        // Navigation UI Visibility
        prevBtn.style.visibility = (currentPage === 0) ? "hidden" : "visible";
        nextBtn.innerText = (currentPage === totalPages) ? "✕" : "→";
        
        console.log("Current Page: " + currentPage);
    }, 200);
}

// --- 1. PC PROMPT HOVER ---
trigger.addEventListener('mouseenter', () => {
    pcPrompt.classList.add('show-prompt');
});

trigger.addEventListener('mouseleave', () => {
    pcPrompt.classList.remove('show-prompt');
});

// --- 2. OPEN ACTION ---
trigger.addEventListener('click', () => {
    currentPage = 0;
    updatePage(); // Ensure cover is loaded
    overlay.classList.remove('hidden');
    room.classList.add('blur');
    bookContainer.classList.remove('exit-down', 'peek-down');
});

// --- 3. EXIT LOGIC ---
exitZone.addEventListener('mouseenter', () => {
    if (!overlay.classList.contains('hidden')) {
        bookContainer.classList.add('peek-down');
    }
});

exitZone.addEventListener('mouseleave', () => {
    bookContainer.classList.remove('peek-down');
});

exitZone.addEventListener('click', () => {
    bookContainer.classList.add('exit-down');
    room.classList.remove('blur');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 600);
});

// --- 4. NAVIGATION ---
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    } else {
        exitZone.click(); // Close on last page
    }
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
});