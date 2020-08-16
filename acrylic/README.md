# Microsoft Fluent Design Acrylic Material


This recreates the _Acrylic_ material which can be found throughout the Windows 10 UI.
It involves multiple layers, including:
 - Background
 - Saturation boost
 - Gaussian blur
 - Exclusion blend
 - Color overlay (currently only white, dark mode coming soon)
 - Tiled noise texture  

As you can see in the picture, Microsoft uses the same layers in the same order:
![Reference](https://docs.microsoft.com/en-us/windows/uwp/design/style/images/acrylicrecipe_diagram.jpg)
A possible result using the acrylic.css and only one <code>div</code>-container is shown below:
![Screenshot](screenshot.png)