const initialState = ()=>{
    const arrBooks = [
        {
            id:1,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:2,
            author: "Ivan Bunin",
            bookTitle: "The collection of poems 2",
            pubDate: "24.08.1850",
            countPages: "201",
            isBook:true,
        },{
            id:3,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:4,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:5,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:6,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:7,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
            countPages: "201",
            isBook:true,
        },{
            id:8,
            author: "Joseph Brodsky",
            bookTitle: "The collection of poems",
            pubDate: "24.08.1996",
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