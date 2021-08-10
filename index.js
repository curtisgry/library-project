class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addToLibrary(library) {
        library.push(this)
    }

    toggleRead() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}

function removeFromLibrary(index) {
    const split = myLibrary.splice(index)
    split.shift()
    myLibrary.push(...split);
    console.log(myLibrary)
}



let myLibrary = [];
const root = document.querySelector('#bookContainer');
const newBtn = document.querySelector('#newBookBtn');
const form = document.querySelector('.new-book');
const closeModal = document.querySelector('.close-modal')
const modal = document.querySelector('.modal');


if (localStorage.getItem('localLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('localLibrary'))
    renderBooks(root, myLibrary)
}




function renderBooks(root, arr) {
    root.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const bookContent = document.createElement('div')
        bookContent.classList.add('book')
        bookContent.setAttribute('data-index', i)
        bookContent.innerHTML = `
        <span class="info info-title">${arr[i].title}</span>
        <span class="info">By ${arr[i].author}</span>
        <span class="info info-small">${arr[i].pages} Pages</span>
        <button class="btn is-read read">Read</button>
        <button class="btn delete" data-index="${i}">Delete</button>
    `;
        if (!arr[i].read) {
            const readEl = bookContent.querySelector('.read');
            readEl.classList.remove('read')
            readEl.classList.add('not-read')
            readEl.innerText = 'Not Read'
        }
        root.append(bookContent);
        bookContent.querySelector('.is-read').addEventListener('click', function () {
            if (arr[i].read) {
                this.classList.remove('read')
                this.classList.add('not-read')
                this.innerText = 'Not Read';
                arr[i].read = false;
            } else {
                this.classList.add('read')
                this.classList.remove('not-read')
                this.innerText = 'Read';
                arr[i].read = true;
            }
            localStorage.setItem('localLibrary', JSON.stringify(myLibrary));

        })
        bookContent.querySelector('.delete').addEventListener('click', function () {
            const idx = parseInt(this.dataset.index);
            removeFromLibrary(idx);
            renderBooks(root, myLibrary)
            localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
        })

    }

}



function handleForm(e) {
    const newTitle = e.target[0].value;
    const newAuthor = e.target[1].value;
    const newPages = e.target[2].value;
    let isRead = false;
    if (e.target[3].checked) {
        isRead = true
    }
    const newBook = new Book(newTitle, newAuthor, newPages, isRead);
    newBook.addToLibrary(myLibrary);
    renderBooks(root, myLibrary)
    modal.classList.remove('active')
    localStorage.setItem('localLibrary', JSON.stringify(myLibrary));

}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleForm(e);
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('active')
})
newBtn.addEventListener('click', () => {
    modal.classList.add('active')
})