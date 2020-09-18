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
export {getListBooks,removeBookByIdAPI, setBookByIdAPI, getBookByIdApi,addBookByIdAPI}