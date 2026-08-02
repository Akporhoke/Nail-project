/* ============================================
   SKELETON LOADING CONTROLLER
   ============================================ */

// Track how many images still need to load
function initSkeletonLoader() {
    const images = document.querySelectorAll('.real-content img');
    let imagesLoaded = 0;
    const totalImages = images.length;

    function markLoaded() {
        document.body.classList.add('loaded');
        console.log('All content loaded — skeleton removed');
    }

    // If there are no images to track, just wait for window load
    if (totalImages === 0) {
        window.addEventListener('load', markLoaded);
        return;
    }

    images.forEach((img) => {
        // If image is already cached/loaded
        if (img.complete) {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                markLoaded();
            }
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    markLoaded();
                }
            });

            // Also count errors as "loaded" so a broken image doesn't
            // freeze the skeleton forever
            img.addEventListener('error', () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    markLoaded();
                }
            });
        }
    });

    // Safety fallback: force-remove skeleton after 8 seconds
    // even if something never fires (bad network, etc.)
    setTimeout(() => {
        if (!document.body.classList.contains('loaded')) {
            markLoaded();
        }
    }, 8000);
}

// Run as soon as the DOM is ready (don't wait for full window load)
document.addEventListener('DOMContentLoaded', initSkeletonLoader);
