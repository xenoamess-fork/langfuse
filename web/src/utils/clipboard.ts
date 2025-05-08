// modified from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/33928558#33928558
export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    // For modern explorers like chrome
    return navigator.clipboard.writeText(text);
  } else if (
    (window as any).clipboardData &&
    (window as any).clipboardData.setData
  ) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return (window as any).clipboardData.setData("Text", text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    let textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
