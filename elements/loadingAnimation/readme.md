# Loading Animation while your page is loading

### 1. Include stylesheet
```
<link rel="stylesheet" href="loading.css"/>
```

### 2. Create HTML elements
```
<div class="loader-fullscreen-wrapper">
    <div class="loader-fullscreen">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</div>
```

### 3. Add JavaScript functions and listener
```
<script>

    function hideLoader( ){
        document.querySelector( 'div.loader-fullscreen-wrapper' ).style.display = 'none';
    }
    
    function showLoader( ){
        document.querySelector( 'div.loader-fullscreen-wrapper' ).style.display = 'initial';
    }
    
    window.addEventListener( 'load',hideLoader );
    
</script>
```
