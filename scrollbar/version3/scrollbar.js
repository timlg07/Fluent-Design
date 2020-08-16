window.addEventListener( "load",()=>{
    window.addEventListener( "mousemove",(evt)=>{
        if( evt.clientX >= (document.body.clientWidth-5) ){
            document.body.classList.add   ( "scrollbar-hover"  );
            document.body.classList.remove( "scrollbar-normal" );
        } else if( document.body.classList.contains( "scrollbar-hover" )){
            document.body.classList.remove( "scrollbar-hover"  );
            document.body.classList.add   ( "scrollbar-normal" );
        }
    });
    document.body.classList.add( "scrollbar-normal" );
});