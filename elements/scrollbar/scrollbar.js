var scrollTimeout = NaN;
window.onscroll =()=> {
    document.body.classList.add("scrolling");
    if( scrollTimeout != NaN ) window.clearTimeout(scrollTimeout)
    scrollTimeout = window.setTimeout(()=>{
        document.body.classList.remove("scrolling");
    },1000);
}