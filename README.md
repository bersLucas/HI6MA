# <a href="https://m3ow.moe">Live demo</a>

A W I D E comic reader. Successor to <a href="/bersLucas/MSlide">MSlide</a>.
HI6MA was created to give users a larger reading area and remove dependency on jQuery.

### Requirements for building
* [NodeJs](https://nodejs.org/en/) 
* [Yarn](https://yarnpkg.com/en/)

### Image Root Folder Set up

* Create a directory to host your image files
* In that folder, create folders for each series.
  * <sub>(The series' folder names must contain no spaces,and must be unique.)</sub>
* Inside of these folders, you will add the following files:
  * **cover.jpg** : The cover that will display on the main page.
 * **A folder for each chapter** : It is inside this folder that individual pages will be added.
    * <sub>*(images MUST be titled xxx.jpg/png, with three integers, starting with 001.jpg/png)*</sub>
  * **data.txt** : Metadata for the series, which will appear as follows:
```
[Series name]
[Alt. Title (kanji)]
[Author]
[Translator or tag info]
[Background color #1]
[Background color #2]
```
> *An example of a valid data.txt file would be*:

```
Dead Dead Demon's
デッドデッドデーモンズ
Asano Inio
Translator's Name
#000
#333
```
<sub>*(Every field is optional and will be used for metadata only. Series will be sorted by series' name)*</sub>

### Example file structure:
<img src="https://cloud.githubusercontent.com/assets/3892772/19536607/aba5b538-961a-11e6-901b-a7ba8085b9af.png"/>

Run the following commands to generate your website:

```bash
# Generate a booklist
node booklistgen.js [root image folder]

# Build index file
yarn run build
```
