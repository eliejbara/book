use mangement;
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  metadata TEXT,
  is_borrowed BOOLEAN DEFAULT FALSE
);
select * from books;