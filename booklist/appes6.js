class Book{
  constructor(title , author , isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
	}

}


class UI{
   
  addBookToList(book){
  const  list = document.getElementById('book-list');

 	//Crete tr Element
 	const row = document.createElement('tr');
 	//Insert cols
 	row.innerHTML = `
 		<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
 	`;

 	//Append to list
  list.appendChild(row);
  
  }

   clearFields(){
    document.getElementById('title').value = '';
	  document.getElementById('author').value = '';
	  document.getElementById('isbn').value = '';
   }

   showAlert(msg , className){
    //Create div 
	const div = document.createElement('div');
	//Add Class
	div.className = `alert ${className}`;
	//Add Text
	div.appendChild(document.createTextNode(msg));
	//Get Parent
	const container = document.querySelector('.container');

	const form = document.querySelector('#book-form');
   
    //insert alert
	container.insertBefore(div, form);

	//Timeout After 3 sec
	setTimeout(function  () {
		document.querySelector('.alert').remove(); 
	},3000);
   }

   deleteBook(target){
   	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
   }
}

//Local Store Class
class Store{
  static getBooks(){
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    }else{
      
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
     const books = Store.getBooks();
     books.forEach(function(book){
      //Add Book to UI
      const ui = new UI();
      ui.addBookToList(book);
      });
  }

  static addBook(book){
     const books = Store.getBooks();
     books.push(book);
     localStorage.setItem('books',JSON.stringify(books));
  }

  static removeBook(isbn){
     console.log(isbn);
     const books = Store.getBooks();
     books.forEach(function(book , index){
      if (book.isbn === isbn) {
         books.splice(index, 1)
       }
      });
    localStorage.setItem('books',JSON.stringify(books));

  }
}

//Dom Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);


//Event Listener
document.getElementById('book-form').addEventListener('submit',
	function (e) {
		console.log('test');
		//Get from values
        const title  = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn   = document.getElementById('isbn').value;
        
        //Instantiate The Book
        const book = new Book(title , author , isbn);
        console.log(book);

        //Instantiate The UI
        const ui = new UI();
        console.log(ui);

        //Validate
        if (title == "" || author == "" || isbn == "") {
        	//Error Alert
        	ui.showAlert("Please Fill In All Fields","error");
        }else{
            //Add book to UI
            ui.addBookToList(book);

            //Add To Local Storage
            Store.addBook(book);

            //Show Success
            ui.showAlert("Book Added","success");
        
	        //Clear Fields
	        ui.clearFields();
        }
        
        
  
    console.log(title , author , isbn);
		e.preventDefault();
	});

//Event Listener For Delete
document.getElementById('book-list').addEventListener('click',function (e) {
	ui = new UI(); 
	ui.deleteBook(e.target) ;
	ui.showAlert("Book Deleted","success");
	//console.log(e.target.parentElement.parentElement);
  //Remove From Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	e.preventDefault();
});