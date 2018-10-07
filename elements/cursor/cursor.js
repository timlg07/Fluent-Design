/*
// usage //

window.onload =()=> { 
    var $cursor = new Cursor( 26 ).create( ).initListener( ).initAnimation( );
}

//*/


class Cursor {
    
    static get colorArray( ){
        return[
            new Color(   0, 120, 215, 1 ),
            new Color( 255, 185,   0, 1 ),
            new Color( 232,  17,  35, 1 ),
            new Color( 136,  23, 152, 1 )
        ]
    }
    
    static get randomColor( ){
        return Cursor.colorArray[~~( Math.random() * Cursor.colorArray.length )];
    }
    
    constructor( size ){
        this.width   = size;
        this.height  = size;
        this.element = null;
        this.nextColor    = Cursor.randomColor;
        this.currentColor = Cursor.randomColor;
        this.steps = {current:40,default:40};
        this.currentColor.onChange = this.setGradient.bind( this,this.currentColor );
        this.dotSize = 20 /* % */;
        this.isHidden = false;
        this.clickCount = {default:20,current:0};
        document.body.style.margin = "0";
    }
    
    create( ){
        this.element = document.createElement( "div" );
        this.parent  = document.createElement( "div" );
        document.body.appendChild ( this.parent  );
        this.parent  .appendChild ( this.element );
        document.querySelectorAll("*").forEach(o=>o.style.cursor = "none");
        this.hide( );
        this.parent .style.overflow = "hidden";
        this.parent .style.position = "fixed" ;
        this.parent .style.top    = "0" ;
        this.parent .style.left   = "0" ;
        this.parent .style.bottom = "0" ;
        this.parent .style.right  = "0" ;
        this.parent .style.cursor =        "none";
        this.parent .style.pointerEvents = "none";
        this.element.style.width  = this.width   ;
        this.element.style.height = this.height  ;
        this.element.style.borderRadius = "100%" ;
        this.element.style.position = "absolute" ;
        this.element.style.border = "2px solid"  ;
        this.element.style.pointerEvents = "none";
        return this;
    }

    initListener( ){
        document.addEventListener( "mousemove" , this.updatePosition .bind( this ));
        document.addEventListener( "mousedown" , this.updatePosition .bind( this ));
        document.addEventListener( "mouseleave", this.hide           .bind( this ));
        document.addEventListener( "mousedown" , this.clickStart     .bind( this ));
        document.addEventListener( "mouseup"   , this.clickEnd       .bind( this ));
        return this;
    }
    
    updatePosition( e ){
        if( this.isHidden ) this.show( );
        this.element.style.top  = e.clientY -1- this.height / 2 ;
        this.element.style.left = e.clientX -1- this.width  / 2 ;
    }
    
    initAnimation( ){
        this.updateColor();
    }
    
    hide( e ){
        this.element.style.display = "none";
        this.isHidden = true;
    }
    
    show( ){
        this.element.style.display = "initial";
        this.isHidden = false;
        this.initAnimation();
    }
    
    updateColor( t ){
        this.steps.current = this.currentColor.transition( this.nextColor,this.steps.current );
        if( this.steps.current === 0 ){
            this.steps.current = this.steps.default;
            this.currentColor = this.nextColor;
            this.nextColor = Cursor.randomColor;
            this.currentColor.onChange = this.setGradient.bind( this,this.currentColor );
        }
        if(!this.isHidden) requestAnimationFrame( this.updateColor.bind( this ) );
    }
    
    setGradient( c ){
        let co = c.cloneValue( );            
        let ct = c.cloneValue( ); 
        ct.a = this.clickCount.mouseDown?.7:this.clickCount.current?(this.clickCount.current--/2)/this.clickCount.default+.2:.1;
        co   = co.RGBA;
        ct   = ct.RGBA;
        let s1 = this.dotSize; let s2 = this.dotSize+1;
        this.element.style.background = `-moz-radial-gradient(center, ellipse cover, ${co} 0%, ${co} ${s1}%, ${ct} ${s2}%)`;
        this.element.style.background = `-webkit-radial-gradient(center, ellipse cover, ${co} 0%, ${co} ${s1}%, ${ct} ${s2}%)`;
        this.element.style.background = `radial-gradient(ellipse at center, ${co} 0%, ${co} ${s1}%, ${ct} ${s2}%)`;
        this.element.style.boxShadow  = `0 0 ${this.width/3}px ${this.width/12}px ${co}`;
        this.element.style.borderColor= co;
    }
    
    clickStart( ){
        this.clickCount.current = 0;
        this.clickCount.mouseDown = true;
    }
    
    clickEnd( ){
        this.clickCount.current = this.clickCount.default;
        this.clickCount.mouseDown = false;
    }
    
}