(function() {
    const detectionRange = 5/*px*/;
    const scrollBarVisibilityTime = 1800/*ms*/;
    const showClass = 'scrollbar-visible';
    const hoverClass = 'scrollbar-hover';
    
    let removeScrollBarTimeout = undefined;
    
    window.addEventListener('mousemove', mouseMoved);
    window.addEventListener('scroll', showScrollBar);
    
    function mouseMoved(event) {
        /*
         * Check if the mouse position is in detection range.
         * This is very simple in this case, because we only use the body.
         */
        let minDetectionX = document.body.clientWidth - detectionRange;
        if (event.clientX > minDetectionX) {
            document.body.classList.add(hoverClass);
        } else if (document.body.classList.contains(hoverClass)) {
            // Show normal scrollbar style instead of hovered style.
            document.body.classList.remove(hoverClass);
            showScrollBar();
        }
    }
    
    function showScrollBar() {
        document.body.classList.add(showClass);
        clearTimeout(removeScrollBarTimeout);
        removeScrollBarTimeout = setTimeout(() => {
            document.body.classList.remove(showClass);
        }, scrollBarVisibilityTime);
    }
}());
