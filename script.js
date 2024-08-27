async function splitParagraphAndCopy() {
  try {
    // Get the latest text from the clipboard
    const paragraph = await navigator.clipboard.readText();

    // Remove all newline characters
    const cleanedParagraph = paragraph.replace(/\n/g, " ");

    if (cleanedParagraph.trim().length === 0) {
      return;
    }

    // Split the paragraph into words
    const words = cleanedParagraph.trim().split(/\s+/);
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
    await copyTextToClipboard(finalText);
  } catch (error) {
    console.error("Failed to read from clipboard: ", error);
  }
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (error) {
    console.error("Failed to copy text to clipboard: ", error);
  }
}

// Automatically process text when the Chrome tab is focused
window.addEventListener("focus", async () => {
  console.log("Tab focused");
  await splitParagraphAndCopy();
});
