class Color {
    
    constructor( r=0,g=0,b=0,a=0 ){
        this.array = [ r,g,b,a ];
        this.onChange =()=> {}
    }
    
    cloneValue( ){
        let n   = new Color();
        n.array = this.array.slice(0);
        return n;
    }
    
    get r () { return this.array[0]; } /**/ get red   () { return this.r; }
    get g () { return this.array[1]; } /**/ get green () { return this.g; }
    get b () { return this.array[2]; } /**/ get blue  () { return this.b; }
    get a () { return this.array[3]; } /**/ get alpha () { return this.a; }
    
    set r (num) { this.array[0] = Math.min( Math.max( 0,num ),255 ); this.onChange(this); } /**/ set red   (num) { this.r = num; }
    set g (num) { this.array[1] = Math.min( Math.max( 0,num ),255 ); this.onChange(this); } /**/ set green (num) { this.g = num; }
    set b (num) { this.array[2] = Math.min( Math.max( 0,num ),255 ); this.onChange(this); } /**/ set blue  (num) { this.b = num; }
    set a (num) { this.array[3] = Math.min( Math.max( 0,num ),  1 ); this.onChange(this); } /**/ set alpha (num) { this.a = num; }
    
    toString( ){
        return this.a == 1 ? this.RGB : this.RGBA;
    }
    
    get RGB( ){
        return "rgb("+ this.array.slice( 0,-1 ).join( ", " ) +")" 
    }
    
    get RGBA( ){
        return "rgba("+ this.array.join( ", " ) +")" 
    }
    
    transition( newColor,steps ){
        if( ! newColor instanceof Color  ) throw new TypeError( "newColor has to be an instance of Color" );
        if(   newColor.RGBA == this.RGBA ) return 0;
        newColor.array.forEach(( e,i,a )=>{
            let delta = (e-this.array[i]) / steps;
            this.array[i] = (i==a.length-1) 
                ? parseFloat((this.array[i] + delta).toFixed(3)) 
                : Math.round( this.array[i] + delta); 
        });
        this.onChange(this);
        return steps-1;
    }
}
