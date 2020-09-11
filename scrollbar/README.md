# Fluent Design Scrollbar
This folder contains the scrollbar-element in the style of the Fluent Design System.
It automatically blends in a small scrollbar thumb without a track when you scroll and blends it out again after a delay when you've stopped scrolling.
When you hover over the scrollbar it expands to its full width and shows a transparent track, thumb and buttons.  

This scrollbar is designed for vertical scrolling only (yet).  

It will not work on browsers like Internet Explorer and Firefox (because Firefox has its own scrollbar styling system that doesn't allow as much modification as the Webkit one).
In this cases the browsers default scrollbar is shown.

## How to use
Take a look at the two usage examples provided in this folder.
### Include the necessary files:
```html
<link rel="stylesheet" href="scrollbar.css">
<script src="scrollbar.js"></script>
```
### Choose a color theme as a class of the documents body:
```html
<body class="light">
    ...
</body>
```
Available themes: `light` and `dark`
