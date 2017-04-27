select sum(LIKES)
from LIKES
wheRE ISBN = 12345;



select BOOKS.TITULO, sum(LIKES), BOOKS.SINOPSE
from LIKES 
join BOOKS
on BOOKS.ISBN = LIKES.ISBN
group by BOOKS.TITULO; -- tambem pode estar agrupado por LIKES.ISBN


select ISBN, sum(LIKES)
from LIKES
group by ISBN; -- esta tambem esta certa mas sem o nome livro nem sinopse

