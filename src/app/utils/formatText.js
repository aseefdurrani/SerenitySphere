// Function to format text chunks
export const formatTextChunk = (text) => {
  // Escape HTML special characters
  const escapeHTML = (str) => {
    return str.replace(/[&<>"']/g, (match) => {
      const escape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return escape[match];
    });
  };

  // Escape HTML special characters
  let formattedText = escapeHTML(text);

  // Remove double asterisks
  formattedText = formattedText.replace(/\*\*/g, "");

  // Indent numbered lists
  formattedText = formattedText.replace(
    /(\d+\.\s)/g,
    '<br><span style="display:inline-block;padding-left:20px;">$1</span>'
  );

  // Convert newlines to <br> tags
  formattedText = formattedText.replace(/\n/g, "<br>");

  return formattedText;
};
