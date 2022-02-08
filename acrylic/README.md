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
[![Reference](https://user-images.githubusercontent.com/33633786/153088791-e5a55274-74af-458f-a257-b174d7762ae4.png)](https://web.archive.org/web/20181122115937im_/https://docs.microsoft.com/en-us/windows/uwp/design/style/acrylic#how-we-designed-acrylic)
A possible result using the acrylic.css and only one <code>div</code>-container is shown below:
![Screenshot](screenshot.png)
