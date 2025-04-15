const form = document.getElementById("book-form");
const tableBody = document.querySelector("#books-table tbody");
const searchInput = document.getElementById("search");

// Load all books
function loadBooks(query = "") {
  const url = query ? `/api/search?q=${query}` : "/api/books";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((book) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.id}</td>
            <td><input value="${book.title}" data-field="title" disabled /></td>
            <td><input value="${
              book.author
            }" data-field="author" disabled /></td>
            <td><input value="${
              book.metadata || ""
            }" data-field="metadata" disabled /></td>
            <td>${book.is_borrowed ? "📕 Borrowed" : "📗 Available"}</td>
            <td>
              <button onclick="toggleStatus(${book.id}, ${book.is_borrowed})">
                ${book.is_borrowed ? "Return" : "Borrow"}
              </button>
              <button onclick="deleteBook(${book.id})">Delete</button>
              <button onclick="toggleEdit(this, ${book.id})">Edit</button>
            </td>
          `;

        tableBody.appendChild(row);
      });
    });
}
function toggleEdit(button, id) {
  const row = button.closest("tr");
  const inputs = row.querySelectorAll("input");

  const isEditing = button.textContent === "Save";

  if (isEditing) {
    // Save updated values
    const title = row.querySelector('input[data-field="title"]').value;
    const author = row.querySelector('input[data-field="author"]').value;
    const metadata = row.querySelector('input[data-field="metadata"]').value;

    fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, metadata }),
    }).then(() => {
      inputs.forEach((input) => (input.disabled = true));
      button.textContent = "Edit";
    });
  } else {
    // Enable editing
    inputs.forEach((input) => (input.disabled = false));
    button.textContent = "Save";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const metadata = document.getElementById("metadata").value;

  fetch("/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, metadata }),
  }).then(() => {
    form.reset();
    loadBooks();
  });
});

function deleteBook(id) {
  fetch(`/api/books/${id}`, { method: "DELETE" }).then(() => loadBooks());
}

function toggleStatus(id, current) {
  fetch(`/api/books/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_borrowed: !current }),
  }).then(() => loadBooks());
}

function editBook(id, field, value) {
  const row = [...tableBody.children].find(
    (r) => r.firstChild.textContent == id
  );
  const title = row.querySelector("input:nth-child(1)").value;
  const author = row.querySelector("input:nth-child(2)").value;
  const metadata = ""; // can be enhanced

  fetch(`/api/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, metadata }),
  });
}

searchInput.addEventListener("input", () => {
  loadBooks(searchInput.value);
});

loadBooks();
