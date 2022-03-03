type printParams = {
  content: HTMLElement;
  pageStyle?: string;
};

export const printWithBrowser = ({
  content,
  pageStyle = `@page { size: A4;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; }`,
}: printParams) => {
  const id = `PRINT_WINDOW`;

  const removeIframe = () => {
    const documentPrintWindow = document.getElementById(id);
    console.log(documentPrintWindow);

    if (documentPrintWindow) {
      document.body.removeChild(documentPrintWindow);
    }
  };

  const printWindow = document.createElement("iframe");
  printWindow.style.position = "absolute";
  printWindow.style.top = "-1000px";
  printWindow.style.left = "-1000px";
  printWindow.id = id;
  printWindow.srcdoc = "<!DOCTYPE html>";
  // @ts-ignore
  const clonedContentNodes = content.cloneNode(true);
  const globalStyleLinkNodes = document.querySelectorAll(
    "link[rel='stylesheet']"
  );
  const isText = clonedContentNodes instanceof Text;
  const renderComponentImgNodes = isText
    ? []
    // @ts-ignore
    : clonedContentNodes.querySelectorAll("img");

  printWindow.addEventListener("load", () => {
    const domDoc =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    if (!domDoc) {
      return alert("浏览器不支持打印");
    }
    domDoc.body.appendChild(clonedContentNodes);

    // 复制图片
    renderComponentImgNodes.forEach((item) => {
      console.log(item);
    });
    // copyStyles
    const headEls = document.querySelectorAll("style, link[rel='stylesheet']");
    for (let i = 0; i < headEls.length; i++) {
      const ele = headEls[i];

      const { tagName } = ele;

      if (tagName === "STYLE") {
        const newHeadEl = domDoc.createElement(tagName);
        // @ts-ignore
        const sheet = ele.sheet;

        if (sheet) {
          let styleCSS = "";
          const cssLength = sheet.cssRules.length;
          for (let j = 0; j < cssLength; ++j) {
            if (typeof sheet.cssRules[j].cssText === "string") {
              styleCSS += `${sheet.cssRules[j].cssText}\r\n`;
            }
          }
          newHeadEl.setAttribute("id", `react-to-print-${i}`);
          newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
        }
        domDoc.head.appendChild(newHeadEl);
      } else {
        const newHeadEl = domDoc.createElement(tagName);

        for (let j = 0, attrLen = ele.attributes.length; j < attrLen; ++j) {
          const attr = ele.attributes[j];
          if (attr) {
            newHeadEl.setAttribute(attr.nodeName, attr.nodeValue || "");
          }
        }
        domDoc.head.appendChild(newHeadEl);
      }
    }
    const styleEl = domDoc.createElement("style");
    styleEl.appendChild(domDoc.createTextNode(pageStyle));
    domDoc.head.appendChild(styleEl);
    setTimeout(() => {
      // @ts-ignore
      printWindow.contentWindow.print();
    }, 50);
  });
  removeIframe();
  document.body.appendChild(printWindow);
};
