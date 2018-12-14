const fs = require('fs');
const rootFolder = process.argv[2];
let booklist = fs.readdirSync(rootFolder);

let books = [];

booklist.forEach(book => {
    let bookData = fs.readFileSync(`${rootFolder}/${book}/data.txt`)
        .toString()
        .split('\n');

    let bookObj = {
        folder: `${rootFolder}/${book}`,
        name: bookData[0],
        kanji: bookData[1],
        author: bookData[2],
        TL: bookData[3],
        BG: bookData[4],
        BBG: bookData[5]
    };

    bookObj.chapters = fs.readdirSync(bookObj.folder)
        .filter(chapter => {
            return fs.lstatSync(`${rootFolder}/${book}/${chapter}`).isDirectory()
        });

    books.push(bookObj);
});

fs.writeFile('./BOOKLIST.js', 'var books = '+JSON.stringify(books), err => {
    if (err){
        return console.log('Unable to generate booklist file\n' + err)
    } else {
        console.log('Booklist generated!\nRun \'yarn run build\' next');
    }
});
