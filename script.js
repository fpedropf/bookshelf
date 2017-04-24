

function Book(title,sinopse,isbn,img,link1,link2){
	this.likes = 0;
	this.dislikes = 0;
	this.title = title;
	this.sinopse = sinopse;
	this.isbn = isbn;
	this.img = img;
	this.link1 = link1;
	this.link2 = link2;

	this.bookshelf;

	this.gosto = function(){
		this.likes++;
	}
	this.ngosto = function(){
		this.dislikes++;
	}	

	this.render = function(id){
		var idTitulo = "#"+id+" .titulo";

		$(idTitulo).html(this.title);

		var idSinopse = "#"+id+" .sinopse";

		$(idSinopse).html(this.sinopse);

		var idImg = "#"+id+" .imagem";

		$(idImg).attr('src',this.img);

		var idLink1 = "#"+id+" .link1";

		$(idLink1).attr('href',this.link1);

		var idLink2 = "#"+id+" .link2";

		$(idLink2).attr('href',this.link2);

		var idLikes = "#"+id+" .cgosto";

		$(idLikes).html(this.likes);

		var idDislikes = "#"+id+" .cngosto";

		$(idDislikes).html(this.dislikes);

		var idButton = "#"+id+" .like";
		var data = {"book":this,"id":id};
		$(idButton).off('click');
		$(idButton).click(data,function(event){  
			event.data.book.gosto();
			event.data.book.render(event.data.id);
		});

		var idButton = "#"+id+" .dislike";
		var data = {"book":this,"id":id};
		$(idButton).off('click');
		$(idButton).click(data,function(event){  
			event.data.book.ngosto();
			event.data.book.render(event.data.id);
			event.data.book.bookshelf.next(event.data.id);

		});

	}
}

function Queue(){
	this.data = [];

	this.enqueue = function(book){

		this.data.push(book);
	}

	this.dequeue = function(){  
		var aux = this.data[0]; // sempre que corre a funcao vai buscar o primeiro elemento!

		this.data = this.data.slice(1,this.data.length); 
		return aux; 

	}
}


function Bookshelf(){ 
	this.shelf = new Queue();

	this.add = function(book){
		book.bookshelf = this;
		this.shelf.enqueue(book);

	}

	this.reset = function(){
		this.shelf = new Queue();
	}

	this.init = function(){
		var configum = this.shelf.dequeue();
		configum.render('livro1');
	
		configum = this.shelf.dequeue();
		configum.render('livro2');
		configum = this.shelf.dequeue();
		configum.render('livro3');

	}

	this.next = function(id){
		var prox = this.shelf.dequeue();
		prox.render(id);
	}

	this.parse = function(data){

		for(var i = 0; i < data.items.length; i++){

			var bookinfo = data.items[i];

			var titulo = bookinfo.volumeInfo.title;
			var sinopse = bookinfo.volumeInfo.description;
			var isbn = bookinfo.volumeInfo.industryIdentifiers[0].identifier ? bookinfo.volumeInfo.industryIdentifiers[0].identifier : bookinfo.volumeInfo.title;
			var img = bookinfo.volumeInfo.imageLinks.small ? bookinfo.volumeInfo.imageLinks.small : bookinfo.volumeInfo.imageLinks.smallThumbnail;
			var link1 = bookinfo.accessInfo.webReaderLink;
			var link2 = bookinfo.volumeInfo.previewLink;

			var livro = new Book(titulo,sinopse,isbn,img,link1,link2);
			this.add(livro);
						
		}

		this.init();

	}


	this.load = function(pesquisa){
			
		this.reset();

		var url = "https://www.googleapis.com/books/v1/volumes?q=" + pesquisa;

		var currentbookshelf = this;

		$.get(url)
			.done(function(data){
				
				currentbookshelf.parse(data);

			}).fail(function(data){

				console.log('Error ' + data);

			});


	}
}

var bookshelf1 = new Bookshelf();

bookshelf1.load("Portugal");

$('#searchbox').submit(function(event){

	bookshelf1.load($('#search').val());
	event.preventDefault();
	
})




































