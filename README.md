# 📝 Sticky Notes App with Persistence

## 📖 Overview

The **Sticky Notes App** is an interactive web application built with **Vanilla JavaScript** that allows users to create, customize, drag, and delete sticky notes directly in the browser.  
Unlike a basic version, this updated application now **supports local storage**, ensuring that all notes persist across page reloads. Users can choose custom colors for notes, type freely with auto-expanding textareas, move notes around the screen, and have all changes saved automatically.  
This project demonstrates advanced DOM manipulation, event handling, and data persistence using browser storage.

---

## 🚀 Features

The updated app includes several useful and user-friendly features:

- 🎨 **Customizable Colors**: Each note has a colored top border which users can select before creating a note, allowing easy visual categorization.
- 📝 **Auto-Expanding Textareas**: As users type, the textarea dynamically resizes to fit the content, providing a seamless typing experience without scrollbars.
- 📦 **Instant Note Creation**: A simple click on the “Create Note” button generates a new note at a default position or with a custom color.
- 🗑️ **Delete Notes**: Each note has a close (`x`) button to remove it from the board, and deletion updates the saved notes automatically.
- 💾 **Persistence with LocalStorage**: All notes (text, color, and position) are saved to the browser’s local storage. Reloading the page restores all existing notes.
- 🖱️ **Drag & Drop Functionality**: Users can drag notes anywhere on the screen. The notes automatically update their position in local storage when dropped.
- 🔝 **Z-Index Management**: The currently moved note is always brought to the front, preventing overlap issues and ensuring smooth interaction.

---

## 🛠 Tech Stack

- **HTML5** → Provides the structure of the app including buttons, inputs, and containers for notes.
- **CSS3** → Styles notes, layout, colors, and the drag-and-drop appearance.
- **JavaScript (ES6+)** → Handles dynamic note creation, deletion, drag-and-drop behavior, auto-expanding textareas, and local storage persistence.

This project demonstrates how a fully interactive and persistent application can be built without relying on external frameworks.

---

## 📂 Project Structure

├── index.html # Main structure of the app  
├── style.css # Styling for notes and layout  
├── main.js # Core logic (create, delete, drag notes)  
└── README.md # Documentation

---

## 📸 Screenshots

<img src="./demo.png" alt="demo image" />

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/sticky-notes-app.git
   ```
2. Open the project folder.
3. Launch the app by opening `index.html` in your browser.

_(Optional: use Live Server for a smoother development experience)_

---

## 🎮 Usage

Using the app is straightforward:

1. Choose a color from the color input. This will be the top border color for the new note.
2. Click “Create Note” to generate a new sticky note on the board.
3. Type inside the note’s textarea. The height automatically adjusts as you type.
4. Click and drag the note to reposition it anywhere on the screen. The note’s new position is automatically saved.
5. Delete a note by clicking the “x” button. The removal is instantly reflected in local storage.

- Reload the page to see all your notes restored exactly where you left them.

This persistent behavior ensures that users don’t lose their notes and can maintain a virtual workspace similar to physical sticky notes.

---

📌 Code Highlights

Creating a new note dynamically:

function createNote(text = "", borderColor = "#000", left = "50px", top = "60px") {
// Creates a note, sets position, color, and appends it to the DOM
}

Auto-expanding textarea with real-time updates:

textArea.addEventListener("input", () => {
textArea.style.height = "auto";
textArea.style.height = textArea.scrollHeight + "px";
saveNotes(); // updates localStorage on every change
});

Saving notes in local storage:

function saveNotes() {
const data = [];
document.querySelectorAll(".note").forEach((note) => {
const textArea = note.querySelector("textarea");
data.push({
text: textArea.value,
color: note.style.borderTopColor,
x: note.style.left,
y: note.style.top,
});
});
localStorage.setItem("notes", JSON.stringify(data));
}

Drag & Drop logic with position persistence:

document.addEventListener("mousemove", (e) => {
if (!note.dom) return;
const distance = { x: e.clientX - cursor.x, y: e.clientY - cursor.y };
note.dom.style.left = note.x + distance.x + "px";
note.dom.style.top = note.y + distance.y + "px";
});
document.addEventListener("mouseup", () => {
if (note.dom) {
saveNotes(); // saves updated position
note.dom = null;
}
});

---

## 📅 Future Improvements

In the future, the app could be enhanced to support multiple additional features that improve usability and functionality. For instance, implementing note resizing so users can adjust both width and height freely, adding a mobile-friendly touch interface for drag-and-drop on touch devices, introducing tags or categories to better organize notes, and providing a dark mode toggle for a better visual experience. Additionally, syncing notes to a backend could allow multi-device access, making the sticky notes truly cross-platform and collaborative. These improvements would take the app from a simple local tool to a more robust productivity application.
