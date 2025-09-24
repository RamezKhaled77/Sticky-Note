const color = document.getElementById("color");
const createBtn = document.getElementById("createBtn");
let list = document.getElementById("list");
let zIndex = 0;

createBtn.addEventListener("click", () => {
  const newNote = document.createElement("div");
  newNote.classList.add("note");
  newNote.innerHTML = `<span class="close">x</span><textarea placeholder="Write something..." rows="2" cols="30"></textarea>`;
  newNote.style.borderTopColor = color.value;
  list.appendChild(newNote);

  if (list.children.length > 0) {
    const textArea = document.querySelector("textarea");
    textArea.focus();
    textArea.addEventListener("input", () => {
      textArea.style.height = textArea.scrollHeight + "px";
    });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
  }
});

let cursor = {
  x: null,
  y: null,
};

let note = {
  dom: null,
  x: null,
  y: null,
};

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
  }
});

document.addEventListener("mousemove", (e) => {
  if (note.dom === null) return;

  let currCursor = {
    x: e.clientX,
    y: e.clientY,
  };

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
  note.dom = null;
});
