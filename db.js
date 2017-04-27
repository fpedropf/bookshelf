

var db = openDatabase("test.db","1.0","base dados", 2 * 1024 * 1024);



db.transaction(function(tx)	{  // transacao apenas para cada ordem, esta para apagar tabela

	tx.executeSql("DROP TABLE USER")

});

db.transaction(function(tx)	{  // transacao apenas para cada ordem, esta para apagar tabela

	tx.executeSql("DROP TABLE LIKES")

});

db.transaction(function(tx)	{  // transacao apenas para cada ordem, esta para apagar tabela

	tx.executeSql("DROP TABLE BOOKS")

});

db.transaction(function(tx)	{ // transacao apenas para cada ordem, esta para criar tabela

	
	tx.executeSql(
	"CREATE TABLE USER("
	+"IP TEXT PRIMARY key not null,"
	+" FOREIGN KEY (IP) REFERENCES LIKES(IP))"
	);

});

db.transaction(function(tx)	{ // transacao apenas para cada ordem, esta para criar tabela

	
	tx.executeSql(
	"CREATE TABLE LIKES("
	+"ISBN int not null,"
	+"IP text not null,"
	+"LIKES INT not null,"
	+"DISLIKES INT not null,"
	+"FOREIGN KEY (ISBN) REFERENCES BOOKS(ISBN),"
	+"FOREIGN KEY (IP) REFERENCES USER(IP))"
	);

});

db.transaction(function(tx)	{ // transacao apenas para cada ordem, esta para criar tabela

	
	tx.executeSql(
	"CREATE TABLE BOOKS("
	+"ISBN INT PRIMARY key not null,"
	+"TITULO TEXT,"
	+"SINOPSE TEXT,"
	+"FOREIGN KEY (ISBN) REFERENCES LIKES(ISBN))"
	);

});





db.transaction(function(tx)	{  // transacao apenas para cada ordem, esta para inserir dados na tabela

	tx.executeSql("INSERT INTO BOOKS (ISBN,TITULO,SINOPSE)"
	+" VALUES(123,'maria leal','ida ao dentista');"
	);
	

	tx.executeSql("INSERT INTO BOOKS (ISBN,TITULO,SINOPSE)"
	+" VALUES(123223,'maria leal 2','ida ao dentista 2');"
	);

});


db.transaction(function(tx){
	tx.executeSql("select * from BOOKS",[],function(tx,results){

		var len = results.rows.length, i;

		for(i=0;i<len;i++){

			alert(results.rows[i]["ISBN"]+results.rows[i]["TITULO"]);

		}

	});
		
});
