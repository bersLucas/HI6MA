# <a href="http://m3ow.moe">Live demo</a>

A W I D E comic reader. Successor to <a href="/bersLucas/MSlide">MSlide</a>.
HI6MA was created to give users a larger reading area and remove dependency on jQuery.

##Set up
* Clone [the master branch](https://github.com/bersLucas/HI6MA/archive/master.zip) onto any web server.
* In the **/i/** folder, create folders for each series.
  * The folder names must be valid folder names, and must be unique.
* Inside of these folders, you will add the following files:
  * **cover.jpg** : The cover that will display on the main page.
  * **data.txt** : Metadata for the series, which will appear as follows:
```
[Series name]
additional information
additional information
...
```
> *An example of a valid data.txt file would be*:

```
Dead Dead Demon's de DeDeDe Destruction
&#12487;&#12487;&#12487;
Asano Inio
```
<sub>*(note how kanji and non-standard charecters must be in html charecter codes)*</sub>
  * **A folder for each chapter** : It is inside this folder that individual pages will be added.

<sub>*(images MUST be titled xxx.jpg/png, with three integers, starting with 001.jpg/png)*</sub>

##Example file structure:
<img src="https://cloud.githubusercontent.com/assets/3892772/19536607/aba5b538-961a-11e6-901b-a7ba8085b9af.png"/>

##Front.php
The file **front.php** will be loaded to the bototm of the page. You can use this file to add information about your site or future releases. This file can contain any PHP, Javascript or HTML.

##Sass
Colors are represented in sass variabless. Use **css/_variables.scss** to edit the background and accent colors. <a href="http://sass-lang.com/">You will need a sass compiler</a>.

HI6MA uses <a href="http://hammerjs.github.io/">Hammer.js</a> for mobile swiping events.
