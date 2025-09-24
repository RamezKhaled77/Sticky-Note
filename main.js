const color = document.getElementById("color");
const createBtn = document.getElementById("createBtn");
let list = document.getElementById("list");
let zIndex = 0;

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// 🟢 Display the saved notes in load
window.addEventListener("load", () => {
  notes.forEach((note) => {
    createNote(note.text, note.color, note.x, note.y);
  });
});

// 🟢 Func to create a new note
function createNote(
  text = "",
  borderColor = "#000",
  left = "50px",
  top = "60px"
) {
  const newNote = document.createElement("div");
  newNote.classList.add("note");
  newNote.style.position = "absolute";
  newNote.style.left = left;
  newNote.style.top = top;
  newNote.style.borderTopColor = borderColor;
  newNote.innerHTML = `
    <span class="close">x</span>
    <textarea placeholder="Write something..." rows="2" cols="30">${text}</textarea>
  `;
  list.appendChild(newNote);

  const textArea = newNote.querySelector("textarea");

  // 🟢 Set the real height when load
  textArea.style.height = "auto";
  textArea.style.height = textArea.scrollHeight + "px";

  // 🟢 Update the height when input
  textArea.addEventListener("input", () => {
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
    saveNotes();
  });

  newNote.querySelector(".close").addEventListener("click", () => {
    newNote.remove();
    saveNotes();
  });
}

// 🟢 Btn for create a new note
createBtn.addEventListener("click", () => {
  createNote("", color.value);
  saveNotes();
});

// 🟢 Save the notes in local storage
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

// 🟢 Drag & Drop Logic
let cursor = { x: null, y: null };
let note = { dom: null, x: null, y: null };

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("note")) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    note.dom = e.target;
    note.x = note.dom.getBoundingClientRect().left;
    note.y = note.dom.getBoundingClientRect().top;

    e.target.children[1].addEventListener("input", () => {
      e.target.children[1].style.height =
        e.target.children[1].scrollHeight + "px";
    });
    e.target.children[1].addEventListener("focus", () => {
      e.target.children[1].style.height =
        e.target.children[1].scrollHeight + "px";
    });
  }
});

document.addEventListener("mousemove", (e) => {
  if (note.dom === null) return;

  let currCursor = { x: e.clientX, y: e.clientY };
  let distance = {
    x: currCursor.x - cursor.x,
    y: currCursor.y - cursor.y,
  };

  note.dom.style.zIndex = ++zIndex;
  note.dom.style.left = note.x + distance.x + "px";
  note.dom.style.top = note.y + distance.y + "px";
  note.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", () => {
  if (note.dom === null) return;
  note.dom.style.cursor = "auto";
  saveNotes(); // 🟢 Update the local storage when u drop the note
  note.dom = null;
});
