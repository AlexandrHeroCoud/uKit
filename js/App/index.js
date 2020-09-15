$(document).ready(()=>{
   const getListBooks = () =>{
       const books = [];
       for (key in localStorage) {
           const storageObject = JSON.parse(localStorage.getItem(key))
           if (storageObject!=null){
               if(storageObject.isBook){
                   books.push(JSON.parse(localStorage.getItem(key)))
               }
           }
       }
       return books
    }

    const getSortArrayById = (arrObj) =>{
       return arrObj.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    const drawListBooks = (listBooks, rootElem) =>{
        rootElem.html(listBooks.map(book=>{
            return $(`<li id="${book.id}" class="list-group-item list-group-item-action" aria-disabled="true">
                        <div class="row d-flex">
                        <div class="col-8 align-content-center">
                            <small class="font-weight-bold">${book.author}</small>
                            <span class="text-muted font-italic">${book.bookTitle}</span>
                        </div>
                        <div class="col-4">
                            <div class="btn-group float-right">
                                <button type="button" class="btn btn-success">Edit</button>
                                <button type="button" class="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    </div>
                    </li>`)
        }))
    }
    drawListBooks(getSortArrayById(getListBooks()), $('.list-books ul'))
})