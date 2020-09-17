import {getListBooks, removeBookByIdAPI, getBookByIdApi, setBookByIdAPI, addBookByIdAPI} from './apiLocalStorage.js'
//Please take me on work! )))
$(document).ready(() => {
    const getSortArrayById = (arrObj) => {
        return arrObj.sort((a, b) => a.id > b.id ? 1 : -1);
    }
    const elemBook = (dataBook) =>{
        return $(`<li id="${dataBook.id}" class="list-group-item list-group-item-action" aria-disabled="true">
                        <div class="row d-flex">
                        <div class="col-8 align-content-center">
                            <small class="font-weight-bold">${dataBook.author}</small>
                            <span class="text-muted font-italic">${dataBook.bookTitle}</span>
                        </div>
                        <div class="col-4">
                            <div class="btn-group float-right">
                                <button type="button" class="btn btn-success edit-elem">Edit</button>
                                <button type="button" class="btn btn-danger remove">Remove</button>
                            </div>
                        </div>
                    </div>
                    </li>`)
    }
    const drawListBooks = (listBooks, rootElem) => {
        rootElem.html(listBooks.map(book => {
            return elemBook(book)
        }))
    }
    drawListBooks(getSortArrayById(getListBooks()), $('.list-books ul'))

    const drawBook = (book, rootElem) => {
        rootElem.append(elemBook(book))
    }

    const changeBook = (book, elem) => {
        console.log(book, elem)
        elem.replaceWith(elemBook(book))
    }
    const formValidator = () => {
        $('.book-form .add').addClass('btn-light')
        let dataForm = {};
        let allInput = [];
        $(".book-form").serializeArray().map(function (input) {
            dataForm[input.name] = input.value;
        });
        for (let key in dataForm) {
            if (dataForm[key] != '') {
                allInput.push(key)
            }
        }

        if (allInput.length != 0) {
            $('.book-form .cancel').removeClass('d-none').addClass('visible')
        }

        if (allInput.length == $(".book-form").serializeArray().length) {
            $('.book-form .add').removeClass('btn-light').addClass('btn-primary enable')
            $(event.target).removeClass('enable').addClass('disable')
        }
    }
    $('.book-form input').keyup(() => formValidator())

    const dangerLightInput = () => {
        const inputsForm = $(".book-form input")
        inputsForm.each(function () {
            const elem = $(this)
            if (elem.val() == '') {
                elem.removeClass('is-valid').addClass('is-invalid')
            } else {
                elem.removeClass('is-invalid').addClass('is-valid')
            }
        })
    }

    $('.book-form .add').on('click', (event) => {
        if ($(event.target).hasClass('enable')) {
            const dataForm = {};
            $(".book-form").serializeArray().map(function (input) {
                dataForm[input.name] = input.value;
            })
            const arrBooks = getSortArrayById(getListBooks())
            const lastId = arrBooks[arrBooks.length - 1].id
            addBook(dataForm, lastId + 1)
        }
        $(event.target).removeClass('enable').addClass('disable')
        dangerLightInput()
    })

    const addBook = async (formData, newId) => {
        let data = formData
        data.id = newId
        data.isBook = true
        await addBookByIdAPI(data)
        const newBook = getBookByIdApi(newId)
        drawBook(JSON.parse(newBook), $('.list-group'))
        $('.book-form .add').removeClass('btn-primary').addClass('btn-light')
        clearForm()
    }

    const removeBook = async (id, elemLi) => {
        await removeBookByIdAPI(id)
        $(elemLi).remove()
    }

    const editBook = (id) => {
        clearForm()
        let book = getBookByIdApi(id)
        book = JSON.parse(book)
        $('input[name$="author"]').val(book.author)
        $('input[name$="bookTitle"]').val(book.bookTitle)
        $('input[name$="pubDate"]').val(book.pubDate)
        $('input[name$="countPages"]').val(book.countPages)

        $('.form-buttons .add').addClass('d-none')
        $('.form-buttons .edit').removeClass('d-none').addClass('visible')
        $('.form-buttons .cancel').removeClass('d-none').addClass('visible')

        $('.book-form').attr('id', book.id)
    }
    const saveChangesEditBook = () =>{
        const form = $(".book-form")
        const id = form.attr('id')
        let dataForm = {};
        dataForm.isBook = true
        dataForm.id = id
        form.serializeArray().map(function (input) {dataForm[input.name] = input.value;});
        setBookByIdAPI(id, JSON.stringify(dataForm)).then(()=>{
            console.log(JSON.parse(getBookByIdApi(id)))
            changeBook(JSON.parse(getBookByIdApi(id)), $(`.list-books ul [id$="${id}"] `))
        })
        $('.form-buttons .edit').removeClass('visible').addClass('d-none')
        $('.form-buttons .add').removeClass('d-none btn-primary').addClass('btn-light')
        clearForm()
    }

    $('.form-buttons .edit').on('click', function(){saveChangesEditBook(this)})

    const clearForm = () => {
        $('input[name$="author"]').val('')
        $('input[name$="bookTitle"]').val('')
        $('input[name$="pubDate"]').val('')
        $('input[name$="countPages"]').val('')
        $(".book-form input").each(function () {
            $(this).removeClass('is-valid')
        })
    }
    $('.book-form .cancel').on('click', () => clearForm())

    $('.list-books ul').bind('click', function (event) {
        const buttonClick = $(event.target)
        const elemUl = buttonClick.parents('li')
        const id = buttonClick.parents('li').attr('id')
        console.log(buttonClick, elemUl, id)
        switch (true) {
            case buttonClick.hasClass('remove'):
                removeBook(id, elemUl)
                break
            case buttonClick.hasClass('edit-elem'):
                editBook(id, elemUl)
                break
            default:
                return
        }
    })
})