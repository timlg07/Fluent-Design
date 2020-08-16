window.addEventListener('load', () => {
    window.addEventListener('mousemove', evt => {
        const detectionRange = 5/*px*/;
        const hoverClass = 'scrollbar-hover';
        if (evt.clientX >= (document.body.clientWidth - detectionRange)) {
            document.body.classList.add(hoverClass);
        } else {
            document.body.classList.remove(hoverClass);
        }
    });
});