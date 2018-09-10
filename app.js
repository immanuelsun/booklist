// Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list')
  // Create tr element
  const row = document.createElement('tr')
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
  `

  list.appendChild(row)
}

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Add div
  const div = document.createElement('div')
  // Add class names
  div.className = `alert ${className}`
  // Get the message text
  div.appendChild(document.createTextNode(message))
  // Get parent
  const container = document.querySelector('.container')
  // Get form
  const form = document.querySelector('#book-form')
  // Insert the alert div
  container.insertBefore(div, form)

  // Timeout after 3 sec
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 3000)
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Event Listener for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn)

  // Instantiate UI
  const ui = new UI()

  if (title === '' || author === '' || isbn === '') {
    // Show alert
    ui.showAlert('Please fill in all the fileds', 'error')
  } else {
    // Add book to list
    ui.addBookToList(book)

    // Show Success
    ui.showAlert('Book added!', 'success')

    // Clear fields
    ui.clearFields()
  }

  // Event Listener for deleting book
  document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI()

    // Delete book
    ui.deleteBook(e.target)

    // Show success alert
    ui.showAlert('Book removed!', 'success');

    e.preventDefault()
  })

  e.preventDefault()
})