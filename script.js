document
  .getElementById("inputParagraph")
  .addEventListener("input", function () {
    splitParagraphAndCopy();
  });

function splitParagraphAndCopy() {
  let paragraph = document.getElementById("inputParagraph").value;

  // Remove all newline characters
  paragraph = paragraph.replace(/\n/g, " ");

  if (paragraph.trim().length === 0) {
    return;
  }

  // Split the paragraph into words
  const words = paragraph.trim().split(/\s+/);
  const totalWords = words.length;
  const wordsPerRow = Math.ceil(totalWords / 13);
  let rows = [];

  for (let i = 0; i < 13; i++) {
    const start = i * wordsPerRow;
    const end = start + wordsPerRow;
    const row = words.slice(start, end).join(" ");
    rows.push(row);
  }

  // Join the rows to ensure proper distribution
  let result = rows.join(" ");
  result = result.split(/\s+/); // Re-split by words
  const finalRows = [];

  for (let i = 0; i < 13; i++) {
    const start = i * wordsPerRow;
    const end = start + wordsPerRow;
    const row = result.slice(start, end).join(" ");
    finalRows.push(row);
  }

  // Copy to clipboard
  const finalText = finalRows.join("\n");
  copyTextToClipboard(finalText);
  document.querySelector("#inputParagraph").value = "";
}

function copyTextToClipboard(text) {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
}
