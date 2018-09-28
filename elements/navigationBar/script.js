// @return {Object} navigationState:
//                  {boolean} isHidden  (true if the navigation-labels are hidden)
//                  {boolean} isVisible (true if the navigation-labels are visible)
function getNavigationState( ){
    
    let hidden = document.getElementById( "navigation" ).classList.contains( "hidden" );
    return{ isHidden:hidden, isVisible:!hidden };
    
}

// @method toggles the visibility of the navigation-label
// @return {Object} navigationState:
//                  {boolean} isHidden  (true if the navigation-labels are hidden)
//                  {boolean} isVisible (true if the navigation-labels are visible)
function toggleNavigationBar( ){
    
    let navigationState = {};
    
    if( getNavigationState().isHidden ){
        document.getElementById( "navigation" ).classList.remove( "hidden" );
        //// hide navigation bar on every click
        //setTimeout( ()=>window.addEventListener( "click",removeOnClick ),100 );
        navigationState = { isHidden:false, isVisible:true };
    } else {
        document.getElementById( "navigation" ).classList.add( "hidden" );
        navigationState = { isHidden:true, isVisible:false };
    }
    
    setNavBackground( navigationState );
    return navigationState;
}

// @method sets the width and the margin of the #content element
function setContentBounding( ){
    
    // the total width of the navigation.
    let navWidth = document.querySelector( "#navigation > #nav-symbols" ).clientWidth
                 + document.querySelector( "#navigation > #nav-labels"  ).clientWidth,
    // shortcut to the style property of the #content
    contentStyle = document.querySelector( "#content" ).style;
    
    
    // subtract the navigationBar-width from the content-width and add it to the content-margin
    let width = document.body.clientWidth - navWidth - 1 /*rounding-safety*/;
    contentStyle.width = width+"px";
    contentStyle.marginLeft = navWidth+"px";
    // same for each section because % isn't working here
    let sections = document.querySelectorAll( "div.section" );
    let padding  = Math.max( width*0.02,20 );
    for(let i=0; i<sections.length; i++ ){
        sections.item( i ).style.width = width-padding-Math.max( 60,padding )+"px";
        sections.item( i ).style.padding = padding+"px";
        sections.item( i ).style.paddingTop  = "20px";
        sections.item( i ).style.paddingLeft = Math.max( 60,padding )+"px";
        sections.item( i ).style.height = ( document.body.clientHeight-padding-20 )+"px";
    }
}

// navigation colorset
var $navigationColors = {
    normal  : "rgb( 0,99,146 )",
    extended: "rgb( 0,44,122 )"
}

// @method sets the background of the #navigation
// @param  [ {Object} navigationState, optional ]
function setNavBackground( state ){
    
    // navigationState.isHidden
    let isHidden;
    
    if( state ){ 
        isHidden = state.isHidden;
    } else {
        isHidden = getNavigationState().isHidden;
    }
    
    // get background from the colorset
    let bg = (
        isHidden ?
            $navigationColors.normal
        :
            $navigationColors.extended
    );
    
    // update navigations background
    document.querySelector( "#navigation" ).style.backgroundColor = bg;
    
    // update symbols color as well
    let rev = document.querySelectorAll( ".reveal" );
    for( let i=0; i<rev.length; i++ ){
        rev.item( i ).style.background = "inherit";
    }
    
    let sym = document.querySelectorAll( ".symbol-wrapper" );
    for( let i=0; i<sym.length; i++ ){
        sym.item( i ).style.background = bg;
    }
    
    onMouseMove( $fluentRevealEffect.lastEvent );
    
}


// @return {String} the background-color of the #navigation
function getNavBackground( ){
    return document.querySelector( "#navigation" ).style.backgroundColor;
}


// @method update method for the UI
function update( ){
    setContentBounding();
    
    /*
    // expand the navigation-bar, if there is enough space //
    
    let cardboard = document.querySelector( ".cardboard" );
    let gap   =  45;
    let width = 300;
    let space = (cardboard.offsetWidth+gap) % (width+gap);
    if( cardboard.offsetWidth < width ) space = 0;
    if( getNavigationState().isHidden && space > 200 ) toggleNavigationBar();
    */
    
    // or does it look better without automatic expansion?
    // lets try it depending on the viewport:
    // but not do this here. the user should decide, I just show him my opinion onload.
    
    
}


//=========// MAIN //=========//
window.onload =()=> {
    
    // save link to navigationelements
    $navElements = {
        symbols : document.querySelectorAll( ".symbol-wrapper" ),
        reveals : document.querySelectorAll( ".reveal" ),
        labels  : document.querySelectorAll( "#navigation > #nav-labels > .nav-label" )
    }
    // starts updating
    setInterval( update,16 );
    // inits bg
    setNavBackground();
    
    // init listener //
    document.addEventListener( "mousemove", onMouseMove );
    document.querySelectorAll( "#content > div.section" ).forEach(o=>o.addEventListener( "DOMMouseScroll", onMouseMove ));
    
    for( let i=0; i<$navElements.symbols.length; i++ ){
        $navElements.symbols.item( i ).addEventListener( "click",handleClicks.bind( $navElements.symbols.item( i ),i ));
        $navElements.labels .item( i ).addEventListener( "click",handleClicks.bind( $navElements.labels .item( i ),i ));
    }
    
    // position activeElementView
    updateActiveNavElemView( 0 );
    
    // making best state and keep it updated on resize
    makeBestNavigationBarState();
    window.addEventListener( "resize",makeBestNavigationBarState);
    
}


function makeBestNavigationBarState( ){
    
    // defining variables for second descision //
    let cardboard = document.querySelector( ".cardboard" );
    let gap   =  45;
    let width = 300;
    let space = (cardboard.offsetWidth+gap) % (width+gap);
    if( cardboard.offsetWidth < width ) space = 0;
    
    if((
        // first decision, based on total width
        innerWidth > 1200  || 
        // second decision, based on the space left
        space      >  200 )&&
        // check if not already shown
        getNavigationState().isHidden 
    ){  // change the state
        toggleNavigationBar();
    }
    
}


var $activeSection = 0;

// @method handles clicks on the navigationbar
// @param  {Number} index of the navigationelement which was clicked
function handleClicks( index, evt ){
    
    // open navigationbar, if closed
    if( index === 0 /*required for hide on every click: && getNavigationState().isHidden*/ ){
        toggleNavigationBar()
    }
    // no further action, if the first element was clicked
    if( index === 0 ){
        return;
    }
    
    index--; // because 0 has no section and is already handled above
    
    document.querySelectorAll( "div.section" ).item( $activeSection ).classList.add( "inactive" );
    document.querySelectorAll( "div.section" ).item( index ).classList.remove( "inactive" );
    
    // update the current active section
    $activeSection = index;
    
    updateActiveNavElemView( index );
    
}

// @method update the activeNavElement-view
// @param  index of the active section
function updateActiveNavElemView( index ){
    
    // nav-active-element-view
    let activeView = document.querySelector( "#navigation > #nav-active-element-view" );
    // increment index, because symbol[1] is linking to section[0] //
    index++;
    // the total height of the symbols (in px), containing padding, border and margin
    let symbolHeight  = 56.8/*px (height)*/ + 1.6/*px (padding/fluentBorder)*/;
    // the additional height of thefirst element
    let defaultOffset = 0.8/*px (first-child-padding/fluentBorder)*/;
    // the width of all elements on top of the active one
    let currentOffset = ( index*symbolHeight ) + defaultOffset;
    // how many percent of the symbol-container.height the activeView should fill 
    let sizePercentage= 66.66/* % */;
    // bigger size if the active element is hovered
    if( getHoveredElemIndex() === index ) sizePercentage = 87;
    // the new top y-coordinate of the nav-active-element-view
    let top = currentOffset + ( symbolHeight * (100-sizePercentage)/200/*(upper space = height * spacePercent/100 /2)*/ );
    // update nav-active-element-view.top
    activeView.style.top = top+"px";
    // update nav-active-element-view.height
    activeView.style.height = ( symbolHeight * sizePercentage/100 )+"px";
    
}

// @return {Number} index of the currently hovered symbol
function getHoveredElemIndex( ){
    
    let hov_symbl = document.querySelector( ".symbol-wrapper:hover" );
    let hov_label = document.querySelector( "#navigation > #nav-labels > .nav-label:hover" );
    
    for( let i=0; i<$navElements.symbols.length; i++ ){
        if
        ( 
            $navElements.symbols.item( i ) === hov_symbl ||
            $navElements.labels .item( i ) === hov_label
        )
        {
            return i;
        } 
    }
    
    return NaN;
    
}


/*
// @method hides nav-labels on a click anywhere
function removeOnClick( evt ){
    toggleNavigationBar();
    window.removeEventListener( "click",removeOnClick );
}
*/


//======// FLUENT REVEAL EFFECT //======================================//
/*REVEAL*/  var $fluentRevealEffect = {
/*REVEAL*/      lightColor  : "rgba(255,255,255,1)",
/*REVEAL*/      darkColor   : "#212121",
/*REVEAL*/      gradientSize: 100,
/*REVEAL*/      lastEvent   : { pageX:screen.width,pageY:screen.height }
/*REVEAL*/  }
/*REVEAL*/  
/*REVEAL*/  var $navElements = {}
/*REVEAL*/  
/*REVEAL*/  function onMouseMove( e ){
/*REVEAL*/
/*REVEAL*/      // update height if hovered
/*REVEAL*/      updateActiveNavElemView( $activeSection );
/*REVEAL*/      
/*REVEAL*/      // CONTENT //
/*REVEAL*/      
/*REVEAL*/      // the borders of all cards
/*REVEAL*/      let cards = document.querySelectorAll( ".cardboard > .card > .border" );
/*REVEAL*/      // the border of the currently hovered card
/*REVEAL*/      let hover_card = document.querySelector( ".cardboard > .card > .border:hover" );
/*REVEAL*/      // foreach( cards )
/*REVEAL*/      for( let i=0; i<cards.length; i++ ){
/*REVEAL*/          if( cards.item( i ) !== hover_card ){ // if the card is not hovered
/*REVEAL*/              let pos = ( e.pageX - cards.item( i ).getBoundingClientRect().left )+ " " +
/*REVEAL*/                        ( e.pageY - cards.item( i ).getBoundingClientRect().top  );
/*REVEAL*/              cards.item( i ).style.background = 
/*REVEAL*/                  "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*2+
/*REVEAL*/                  ", from(#dfdfdf), to(transparent))"
/*REVEAL*/              ;
/*REVEAL*/          } else { // if the card is hovered
/*REVEAL*/              hover_card.style.background = "#FEFEFE";
/*REVEAL*/          }
/*REVEAL*/      }
/*REVEAL*/
/*REVEAL*/      // the overlays of all cards
/*REVEAL*/      let overlays = document.querySelectorAll( ".cardboard > .card > .border > .content > .overlay" );
/*REVEAL*/      // the overlay of the currently hovered card
/*REVEAL*/      let hovered_overlay = document.querySelector(".cardboard > .card > .border > .content > .overlay:hover");
/*REVEAL*/      for( let i=0; i<overlays.length; i++ ){
/*REVEAL*/          if( overlays.item( i ) == hovered_overlay ){ // if the card is hovered
/*REVEAL*/              let pos = ( e.pageX - hovered_overlay.getBoundingClientRect().left )+ " " +
/*REVEAL*/                        ( e.pageY - hovered_overlay.getBoundingClientRect().top  );
/*REVEAL*/              hovered_overlay.style.background = 
/*REVEAL*/                  "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*3+
/*REVEAL*/                  ", from(rgba(255,255,255,.35)), to(rgba(250,250,250,.001))"
/*REVEAL*/              ;
/*REVEAL*/          } else { // if the card is not hovered
/*REVEAL*/              overlays.item( i ).style.background = "rgba(0,0,0,.1)"
/*REVEAL*/          }
/*REVEAL*/      }
/*REVEAL*/      
/*REVEAL*/      
/*REVEAL*/      // NAVIGATION_VIEW //
/*REVEAL*/      
/*REVEAL*/      // save the current position for mouseMove simulations
/*REVEAL*/      $fluentRevealEffect.lastEvent = e;
/*REVEAL*/      
/*REVEAL*/      // reset colors
/*REVEAL*/      for( let i=0; i<$navElements.symbols.length; i++ ){
/*REVEAL*/          $navElements.symbols.item( i ).style.background = getNavBackground();
/*REVEAL*/          $navElements.labels .item( i ).style.background = getNavBackground();
/*REVEAL*/          $navElements.reveals.item( i ).style.background = getNavBackground();
/*REVEAL*/      }
/*REVEAL*/      
/*REVEAL*/      // CASE#1: nav-labels are hidden
/*REVEAL*/      if( getNavigationState().isHidden ){
/*REVEAL*/          
/*REVEAL*/          // reveal effect for all symbols
/*REVEAL*/          let rev = document.querySelectorAll( ".reveal" );
/*REVEAL*/          for( let i=0; i<rev.length; i++ ){
/*REVEAL*/              let pos = ( e.pageX - rev.item( i ).getBoundingClientRect().left )+ " " +
/*REVEAL*/                        ( e.pageY - rev.item( i ).getBoundingClientRect().top  );
/*REVEAL*/              let gradient =
/*REVEAL*/                  "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*1.1+
/*REVEAL*/                  ", from(rgba(255,255,255,.7)), to(transparent))"
/*REVEAL*/              ;
/*REVEAL*/              rev.item( i ).style.background = gradient;
/*REVEAL*/          }
/*REVEAL*/          // hover effect for hovered symbol
/*REVEAL*/          let hov = document.querySelector( ".symbol-wrapper:hover" )
/*REVEAL*/          if( hov ){
/*REVEAL*/              hov.style.background = rgb2rgba( getNavBackground(),.5 );
/*REVEAL*/          }
/*REVEAL*/      
/*REVEAL*/      // CASE#2: nav-labels are shown
/*REVEAL*/      } else {
/*REVEAL*/          
/*REVEAL*/          // CASE#2.1: a nav-label is hovered
/*REVEAL*/          let lab = document.querySelector( "#navigation > #nav-labels > .nav-label:hover" );
/*REVEAL*/          if( lab ) {
/*REVEAL*/              
/*REVEAL*/              // label hover effect // 
/*REVEAL*/              let pos = ( e.pageX - lab.getBoundingClientRect().left )+ " " +
/*REVEAL*/                        ( e.pageY - lab.getBoundingClientRect().top  );
/*REVEAL*/              let gradient =
/*REVEAL*/                   "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*4+
/*REVEAL*/                   ", from(rgba(255,255,255,0.3)), to(rgba(255,255,255,0.0))), "+getNavBackground()
/*REVEAL*/              ;
/*REVEAL*/              lab.style.background = gradient;
/*REVEAL*/              
/*REVEAL*/              // symbol hover effect //
/*REVEAL*/              let index = 0;
/*REVEAL*/              for( let i=0; i<$navElements.labels.length; i++ ){
/*REVEAL*/                  if( $navElements.labels.item( i ) == lab ) index = i; 
/*REVEAL*/              }
/*REVEAL*/              pos = ( e.pageX - $navElements.reveals.item( index ).getBoundingClientRect().left )+ " " +
/*REVEAL*/                    ( e.pageY - $navElements.reveals.item( index ).getBoundingClientRect().top  );
/*REVEAL*/              gradient =
/*REVEAL*/                   "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*4+
/*REVEAL*/                   ", from(rgba(255,255,255,0.3)), to(rgba(255,255,255,0.0))), "+getNavBackground()
/*REVEAL*/              ;
/*REVEAL*/              $navElements.reveals.item( index ).style.background = gradient;
/*REVEAL*/              $navElements.symbols.item( index ).style.background = "transparent";
/*REVEAL*/          
/*REVEAL*/          // CASE#2.2: no nav-label is hovered
/*REVEAL*/          } else {
/*REVEAL*/              
/*REVEAL*/              // CASE#2.2.1: no symbol is hovered -> no effect
/*REVEAL*/              let revhov = document.querySelector( ".reveal:hover" );
/*REVEAL*/              let rev = document.querySelectorAll( ".reveal" );
/*REVEAL*/              if( !revhov ) return;
/*REVEAL*/              
/*REVEAL*/              // CASE#2.2.2: a symbol is hovered
/*REVEAL*/              
/*REVEAL*/              let index = 0;
/*REVEAL*/              for( let i=0; i<rev.length; i++ ){
/*REVEAL*/                  if( rev.item( i ) == revhov ) index = i; 
/*REVEAL*/              }
/*REVEAL*/              // symbol hover effect //
/*REVEAL*/              let pos = ( e.pageX - revhov.getBoundingClientRect().left )+ " " +
/*REVEAL*/                        ( e.pageY - revhov.getBoundingClientRect().top  );
/*REVEAL*/              let gradient =
/*REVEAL*/                   "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*4+
/*REVEAL*/                   ", from(rgba(255,255,255,0.3)), to(rgba(255,255,255,0.0))), "+getNavBackground()
/*REVEAL*/              ;
/*REVEAL*/              revhov.style.background = gradient;
/*REVEAL*/              
/*REVEAL*/              // label hover effect //
/*REVEAL*/              pos = ( e.pageX - $navElements.labels.item( index ).getBoundingClientRect().left )+ " " +
/*REVEAL*/                    ( e.pageY - $navElements.labels.item( index ).getBoundingClientRect().top  );
/*REVEAL*/              gradient =
/*REVEAL*/                   "-webkit-gradient(radial, "+pos+", 0, "+pos+", "+$fluentRevealEffect.gradientSize*4+
/*REVEAL*/                   ", from(rgba(255,255,255,0.3)), to(rgba(255,255,255,0.0))), "+getNavBackground()
/*REVEAL*/              ;
/*REVEAL*/              $navElements.labels .item( index ).style.background = gradient;
/*REVEAL*/              $navElements.symbols.item( index ).style.background = "transparent";
/*REVEAL*/      
/*REVEAL*/          }
/*REVEAL*/      }
/*REVEAL*/  }



// ======= // COLOR // ========== //

// @param  {String} the color as rgb-string
//         {Number} the alpha-value [0;1]
// @return {String} rgba(...) string
function rgb2rgba( rgb,a ){
    return "rgba("+rgb2array( rgb ).concat(a).join(", ")+")";
}

// @param  {String} the color as rgb-string
// @return {Array}  the color values 
function rgb2array( rgb ){
    return rgb.match(/\d+/g);
}












