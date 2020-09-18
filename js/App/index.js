

////////////////////////////////////////----------INITIALAPP.JS-------------////////////////////////////////////////
const initialState = ()=>{
    const arrBooks = [
        {
            id:1,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:2,
            author: "Ivan Bunin",
            bookTitle: "The collection of poems 2",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:3,
            author: "Mikhail Bulgakov",
            bookTitle: "The master and Margarita",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:4,
            author: "Omar Khayyam",
            bookTitle: "The collection of poems",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:5,
            author: "Mikhail Bulgakov",
            bookTitle: "Morphine",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:6,
            author: "Alexander Pushkin",
            bookTitle: "The collection of poems",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:7,
            author: "Mikhail Sholokhov",
            bookTitle: "Quiet Don",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        },{
            id:8,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "1996-08-24",
            countPages: "201",
            isBook:true,
        }
    ]
    for (let i=0; i<arrBooks.length; i++){
        localStorage.setItem(arrBooks[i].id, JSON.stringify(arrBooks[i]))
    }
}
const getCookie = (name) =>{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
/**
 * @function session()
 * @param {function} initialState
 * @description проверяем первый вход на страницу
 * **/
const session = (initialState, getCookie) =>{
    if (!getCookie('userSession')){
        initialState();
        document.cookie = "userSession=true";
    }
}
session(initialState,getCookie);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////API-LOCALSTORAGE.JS/////////////////////////////////////////////////////////
//import {getListBooks, removeBookByIdAPI, getBookByIdApi, setBookByIdAPI, addBookByIdAPI} from './apiLocalStorage.js'
const getListBooks = () =>{
    const books = [];
    let key;
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

const getBookByIdApi = (id) =>{
    return localStorage.getItem(id)
}

const removeBookByIdAPI = async (id) =>{
    localStorage.removeItem(id)
}
const setBookByIdAPI = async (id, newData) =>{
    return localStorage.setItem(id, newData)
}
const addBookByIdAPI = async (data) =>{
    localStorage.setItem(data.id, JSON.stringify(data))
}
//////////////////////////////////////////////////////////////////////////////////////
//Please take me on work! )))
$(document).ready(() => {
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
    /**
     * @function getFormObj()
     * @return {Object}
     * @description return all fields book-form
     * ***/
    const getFormObj = () =>{
        let dataForm = {};
        $(".book-form").serializeArray().map(function (input) {
            dataForm[input.name] = input.value;
        });
        return dataForm
    }

    /**
     * @function getFormArray()
     * @return {Array}
     * @description return array objects {name:"...",value:"..."}
     * **/
    const getFormArray = () =>{
       return  $(".book-form").serializeArray()
    }

    /**
     * @function getSortArrayById()
     * @return {Array}
     * **/

    const getSortArrayById = (arrObj) => {
        return arrObj.sort((a, b) => a.id > b.id ? 1 : -1);
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
        elem.replaceWith(elemBook(book))
    }
    const formValidator = () => {
        let dataForm = getFormObj();
        let allInput = [];

        for (let key in dataForm) {
            if (dataForm[key] !== '') {
                allInput.push(key)
            }
        }

        return allInput.length === getFormArray().length;
    }


    const formInputsLight = () => {
        const inputsForm = $(".book-form input")
        inputsForm.each(function () {
            const elem = $(this)
            if (elem.val() === '') {
                elem.removeClass('is-valid').addClass('is-invalid')
            } else {
                elem.removeClass('is-invalid').addClass('is-valid')
            }
        })
    }
    const formButtonsLight = (validator) =>{
        if (validator()) {
            $(".book-form .add").removeClass('btn-light').addClass('btn-primary')
        }
    }
    $('.book-form').keyup(()=>{
        formButtonsLight(formValidator)
    })
    $('.book-form input').change(()=>{
        formInputsLight()
        formButtonsLight(formValidator)
    })

    $('.book-form .add').on('click', (event) => {
        if (!formValidator()) {
            alert('Error! Please fill in all fields.')
            formInputsLight()
            return
        }
        const dataForm = {};
        $(".book-form").serializeArray().map(function (input) {
            dataForm[input.name] = input.value;
        })
        const arrBooks = getSortArrayById(getListBooks())
        const lastId = ()=>{if(arrBooks[arrBooks.length - 1].id){return arrBooks[arrBooks.length - 1].id} else{return 0}}
        addBook(dataForm, lastId + 1)
        $(event.target).removeClass('enable').addClass('disable')
    })

    const addBook = (formData, newId) => {
        let data = formData
        data.id = newId
        data.isBook = true
        addBookByIdAPI(data).then(()=>{
            const newBook = getBookByIdApi(newId)
            drawBook(JSON.parse(newBook), $('.list-group'))
            $('.book-form .add').removeClass('btn-primary').addClass('btn-light')
            clearForm()
        })
    }

    const removeBook = (id, elemLi) => {
        removeBookByIdAPI(id).then(()=>{
            if(id == $('.book-form').attr('id')){
                $('.book-form').removeAttr('id')
            }
            $(".book-form .edit").addClass('d-none')
            $(".book-form .add").removeClass('d-none btn-primary').addClass('btn-light')
            $(elemLi).remove()
        })
    }

    const editBook = (id) => {
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
        formInputsLight()
    }
    const saveChangesEditBook = () =>{
        const form = $(".book-form")
        const id = form.attr('id')
        let dataForm = getFormObj()
        dataForm.isBook = true
        dataForm.id = id
        setBookByIdAPI(id, JSON.stringify(dataForm)).then(()=>{
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
        $(".book-form").removeAttr('id')
        $(".book-form input").each(function () {
            $(this).removeClass('is-valid')
            $(this).removeClass('is-invalid')
        })
        $(".book-form .edit").addClass('d-none')
        $(".book-form .add").removeClass('d-none')
        $(".book-form .cancel").addClass('d-none')
    }

    $('.book-form .cancel').on('click', () => {clearForm();
    formButtonsLight(formValidator)})

    $('.list-books ul').bind('click', function (event) {
        const buttonClick = $(event.target)
        const elemUl = buttonClick.parents('li')
        const id = buttonClick.parents('li').attr('id')
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