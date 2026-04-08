document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.steam-carousel');
    if (carousels.length === 0) return;

    // --- Popup functionality (shared across all carousels) ---
    let popupOverlay = null;
    let popupMediaItems = null;
    let currentPopupIndex = 0;

    const createPopup = () => {
        if (document.querySelector('.sc-popup-overlay')) {
            popupOverlay = document.querySelector('.sc-popup-overlay');
            return;
        }

        popupOverlay = document.createElement('div');
        popupOverlay.className = 'sc-popup-overlay';
        popupOverlay.style.display = 'none';

        const popupContent = document.createElement('div');
        popupContent.className = 'sc-popup-content';

        const closeButton = document.createElement('span');
        closeButton.className = 'sc-popup-close';
        closeButton.innerHTML = '&times;';

        const prevButton = document.createElement('span');
        prevButton.className = 'sc-popup-nav sc-popup-prev';
        prevButton.innerHTML = '&#10094;';

        const nextButton = document.createElement('span');
        nextButton.className = 'sc-popup-nav sc-popup-next';
        nextButton.innerHTML = '&#10095;';

        popupOverlay.appendChild(prevButton);
        popupOverlay.appendChild(popupContent);
        popupOverlay.appendChild(nextButton);
        popupOverlay.appendChild(closeButton);
        document.body.appendChild(popupOverlay);

        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay || e.target === closeButton) {
                closePopup();
            }
        });

        prevButton.addEventListener('click', () => navigatePopup(-1));
        nextButton.addEventListener('click', () => navigatePopup(1));
    };

    const showPopupMedia = (index) => {
        if (!popupOverlay) createPopup();
        if (!popupMediaItems) return;

        currentPopupIndex = (index + popupMediaItems.length) % popupMediaItems.length;
        const mediaItem = popupMediaItems[currentPopupIndex];

        if (mediaItem.dataset.src) {
            mediaItem.src = mediaItem.dataset.src;
            mediaItem.removeAttribute('data-src');
        }

        const popupContent = popupOverlay.querySelector('.sc-popup-content');
        popupContent.innerHTML = '';

        let mediaClone;
        if (mediaItem.tagName === 'VIDEO') {
            mediaClone = document.createElement('video');
            mediaClone.src = mediaItem.src;
            mediaClone.controls = true;
            mediaClone.autoplay = true;
            // mediaClone.controls = true;
            mediaClone.playsinline = true;
            mediaClone.loop = true;
        } else if (mediaItem.tagName === 'IFRAME') {
            mediaClone = document.createElement('iframe');
            mediaClone.src = mediaItem.src;
            mediaClone.title = mediaItem.title || 'YouTube video player';
            mediaClone.allow = mediaItem.allow || 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            mediaClone.referrerPolicy = mediaItem.referrerPolicy || 'strict-origin-when-cross-origin';
            mediaClone.allowFullscreen = true;
            mediaClone.loading = 'lazy';
        } else {
            mediaClone = document.createElement('img');
            mediaClone.src = mediaItem.src;
        }
        mediaClone.className = 'sc-popup-media';
        popupContent.appendChild(mediaClone);
        popupOverlay.style.display = 'flex';
    };

    const navigatePopup = (direction) => {
        showPopupMedia(currentPopupIndex + direction);
    };

    const closePopup = () => {
        if (popupOverlay) {
            popupOverlay.style.display = 'none';
            const popupContent = popupOverlay.querySelector('.sc-popup-content');
            popupContent.innerHTML = '';
            document.removeEventListener('keydown', handleKeydown);
        }
    };

    const handleKeydown = (e) => {
        if (e.key === 'ArrowRight') navigatePopup(1);
        else if (e.key === 'ArrowLeft') navigatePopup(-1);
        else if (e.key === 'Escape') closePopup();
    };

    // // Swipe functionality for popup
    // let touchStartX = 0;
    // let touchStartY = 0;
    // let touchEndX = 0;
    // let touchEndY = 0;

    // popupOverlay?.addEventListener('touchstart', (e) => {
    //     touchStartX = e.changedTouches[0].screenX;
    //     touchStartY = e.changedTouches[0].screenY;
    // }, { passive: true });

    // popupOverlay?.addEventListener('touchend', (e) => {
    //     touchEndX = e.changedTouches[0].screenX;
    //     touchEndY = e.changedTouches[0].screenY;
    //     handleSwipe();
    // });

    // const handleSwipe = () => {
    //     const deltaX = touchEndX - touchStartX;
    //     const deltaY = touchEndY - touchStartY;
    //     const swipeThreshold = 50; // Minimum distance for a swipe

    //     if (Math.abs(deltaX) > Math.abs(deltaY)) { // Horizontal swipe
    //     if (Math.abs(deltaX) > swipeThreshold) {
    //         if (deltaX < 0) { // Swipe left
    //         navigatePopup(1);
    //         } else { // Swipe right
    //         navigatePopup(-1);
    //         }
    //     }
    //     } else { // Vertical swipe
    //     if (deltaY > swipeThreshold) { // Swipe down
    //         closePopup();
    //     }
    //     }
    // };

    // --- Initialize each carousel ---
    carousels.forEach(carousel => {
        const mainMediaItems = carousel.querySelectorAll('.sc-media-item');
        const thumbnails = carousel.querySelectorAll('.sc-thumbnail');
        const thumbnailStrip = carousel.querySelector('.sc-thumbnail-strip');
        const thumbnailWrapper = carousel.querySelector('.sc-thumbnail-strip-wrapper');
        const overlay = carousel.querySelector('.sc-video-overlay');
        const mainView = carousel.querySelector('.sc-main-view');
        const duration = carousel.dataset.duration ? parseInt(carousel.dataset.duration, 10) : null;

        const isVideoSlide = (media) => media && (media.tagName === 'VIDEO' || media.tagName === 'IFRAME');
        const stopActiveMediaPlayback = (media) => {
            if (!media) return;

            if (media.tagName === 'VIDEO') {
                media.pause();
                media.currentTime = 0;
            }

            if (media.tagName === 'IFRAME' && media.src) {
                // Reload the iframe URL to stop any ongoing YouTube playback.
                media.src = media.src;
            }
        };

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index, 10);
                const newActiveMedia = mainMediaItems[index];
                overlay.style.display = 'none';

                if (newActiveMedia.dataset.src) {
                    newActiveMedia.src = newActiveMedia.dataset.src;
                    newActiveMedia.removeAttribute('data-src');
                }

                const currentActiveMedia = carousel.querySelector('.sc-media-item.active');
                if (currentActiveMedia && currentActiveMedia !== newActiveMedia) {
                    currentActiveMedia.classList.remove('active');
                    stopActiveMediaPlayback(currentActiveMedia);
                }

                newActiveMedia.classList.add('active');

                if (newActiveMedia.tagName === 'VIDEO') {
                    newActiveMedia.currentTime = 0;
                    newActiveMedia.play().catch(error => console.error("Video play failed:", error));
                }

                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        thumbnailWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            thumbnailStrip.style.cursor = 'grabbing';
            startX = e.pageX - thumbnailWrapper.offsetLeft;
            scrollLeft = thumbnailWrapper.scrollLeft;
        });
        thumbnailWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            thumbnailStrip.style.cursor = 'grab';
        });
        thumbnailWrapper.addEventListener('mouseup', () => {
            isDown = false;
            thumbnailStrip.style.cursor = 'grab';
        });
        thumbnailWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - thumbnailWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            thumbnailWrapper.scrollLeft = scrollLeft - walk;
        });

        mainView.addEventListener('click', (e) => {
            // If the click is on the overlay, let its own handler manage it and don't open the popup.
            if (overlay && (e.target === overlay || overlay.contains(e.target))) {
                // The existing 'manualPlay' function attached to the overlay will handle playing the video.
                return;
            }

            // If overlay is visible but the click wasn't on it, or if it's not visible, proceed to show popup.
            if (overlay && window.getComputedStyle(overlay).display !== 'none') {
                const activeMedia = carousel.querySelector('.sc-media-item.active');
                if (activeMedia && activeMedia.tagName === 'VIDEO') {
                    activeMedia.play().catch(error => console.error("Manual play failed:", error));
                    overlay.style.display = 'none';
                }
            } else {
                popupMediaItems = mainMediaItems;
                const activeThumb = carousel.querySelector('.sc-thumbnail.active');
                const startIndex = parseInt(activeThumb.dataset.index, 10);
                showPopupMedia(startIndex);
                document.addEventListener('keydown', handleKeydown);
            }
        });

        if (duration) {
            let autoPlayInterval;
            let hasBeenSeen = false;

            const advanceToNext = () => {
                if (!canAutoPlayNow()) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                    return;
                }

                const currentActive = carousel.querySelector('.sc-thumbnail.active');
                const currentIndex = parseInt(currentActive.dataset.index, 10);
                const nextIndex = (currentIndex + 1) % thumbnails.length;
                thumbnails[nextIndex].click();
            };

            const canAutoPlayNow = () => {
                const activeMedia = carousel.querySelector('.sc-media-item.active');
                return !isVideoSlide(activeMedia);
            };

            const startAutoPlay = () => {
                if (!canAutoPlayNow()) return;
                if (autoPlayInterval) clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(advanceToNext, duration * 1000);
            };

            const resetAutoPlay = () => {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                if (canAutoPlayNow()) startAutoPlay();
            };

            mainMediaItems.forEach(media => {

            });

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', resetAutoPlay);
            });

            mainMediaItems.forEach(media => {
                if (media.tagName === 'VIDEO') {
                    media.addEventListener('play', () => {
                        if (hasBeenSeen && !autoPlayInterval) startAutoPlay();
                    });
                    media.addEventListener('pause', () => {
                        const active = carousel.querySelector('.sc-media-item.active');
                        if (active === media) {
                            clearInterval(autoPlayInterval);
                            autoPlayInterval = null;
                        }
                    });
                }
            });

            const observeTarget = mainView || carousel;
            let observer;

            const onSeen = () => {
                if (hasBeenSeen) return;
                hasBeenSeen = true;

                const activeMedia = carousel.querySelector('.sc-media-item.active');
                if (activeMedia && activeMedia.tagName === 'VIDEO') {
                    activeMedia.play().catch(error => {
                        if (overlay) overlay.style.display = 'flex';
                        console.error("Autoplay failed:", error);
                    });
                }

                const manualPlay = () => {
                    if (activeMedia && activeMedia.tagName === 'VIDEO' && activeMedia.paused) {
                        activeMedia.play();
                        if (overlay) overlay.style.display = 'none';
                    }
                };

                if (overlay) overlay.addEventListener('click', manualPlay);
                if (activeMedia) activeMedia.addEventListener('click', manualPlay);

                startAutoPlay();
                if (observer && typeof observer.disconnect === 'function') observer.disconnect();
                window.removeEventListener('scroll', fallbackCheck, { passive: true });
                window.removeEventListener('resize', fallbackCheck);
            };

            const fallbackCheck = () => {
                const rect = observeTarget.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) onSeen();
            };

            if ('IntersectionObserver' in window) {
                observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) onSeen();
                    });
                }, { threshold: 0.5 });
                observer.observe(observeTarget);

                const firstRect = observeTarget.getBoundingClientRect();
                if (firstRect.top < window.innerHeight && firstRect.bottom > 0) onSeen();
            } else {
                window.addEventListener('scroll', fallbackCheck, { passive: true });
                window.addEventListener('resize', fallbackCheck);
                fallbackCheck();
            }
        }
    });
});
