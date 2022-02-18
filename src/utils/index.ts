export function wait(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function download(link: string, name: string) {
  if (!name) {
    name = link.slice(link.lastIndexOf("/") + 1);
  }
  let eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.style.display = "none";
  eleLink.href = link;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}

export function downloadFile(name, content) {
  if (typeof name == "undefined") {
    throw new Error("The first parameter name is a must");
  }
  if (typeof content == "undefined") {
    throw new Error("The second parameter content is a must");
  }
  if (!(content instanceof Blob)) {
    if (typeof content !== "string") {
      content = JSON.stringify(content, null, 2);
    }
    content = new Blob([content]);
  }
  const link = URL.createObjectURL(content);
  download(link, name);
}
export function uuid(
  length = 8,
  chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
