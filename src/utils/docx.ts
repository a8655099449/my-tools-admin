// import { downloadFile } from "@/pages/Configure/judicialOrder";
import { downloadFile } from '.'

export const html2docx = ({ content = '' as any, head = '', height = '29.7cm', width = '21cm', fileName = `file-${Date.now()}.docx`, showHead = false, justGetContent = false }) => {
	let headContent = ''
	if (head && showHead) {
		headContent = ` <div style='mso-element:header' id=h1 >
    <!-- HEADER-tags -->
        <p class=MsoHeader style="text-align:center;color:#000;border-bottom:1px solid #000;" >
           ${head}
          </p>
    <!-- end HEADER-tags -->
    </div>`
	}
	if (typeof content !== 'string' && content.innerHTMl) {
		content = content.innerHTML
	}
	const pageContent = `<html xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
xmlns="http://www.w3.org/TR/REC-html40">
<head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><title></title>
<style>
v:* {behavior:url(#default#VML);}
o:* {behavior:url(#default#VML);}
w:* {behavior:url(#default#VML);}
.shape {behavior:url(#default#VML);}
</style>
<style>
@page
{
    size:${width} ${height};     
    margin:3cm 2cm 2cm 2cm;
}

@page Section1 {
    mso-header-margin:1.5cm;
    mso-footer-margin:1.75cm;
    mso-header: h1;
    mso-footer: f1;
    mso-page-numbers:1;
  
}
@page FooterBox{
  
}
div.Section1 { page:Section1; }
div.MsoFooter { page:FooterBox; }

table#hrdftrtbl
{
    margin:0in 0in 0in 900in;
    width:1px;
    height:1px;
    overflow:hidden;
}


.word-page-bottom-wrap {
  border-top: 1px solid #000;
  text-align: justify;
}
</style>
<xml>
<w:WordDocument>
<w:View>Print</w:View>
<w:Zoom>100</w:Zoom>
<w:DoNotOptimizeForBrowser/>
</w:WordDocument>
</xml>
</head>

<body>
<div class="Section1">
<div style="display: flex;text-align:justify;text-justify:distribute-all-lines;">
<span>111</span>
<span>111</span>
</div>
    
<div style='mso-element:footer' id=f1>

  <span style='position:relative;z-index:-1'> 
  <div style="border-top:1.0000pt solid windowtext;">
    <span>111</span>
    <span>111</span>
  </div>
</div>
</div>

</body></html>`
	if (justGetContent) {
		return content
	}
	let blob = new Blob([pageContent], {
		type: 'application/doc;charset=utf-8',
	})
	// downloadFile(fileName, blob)
	downloadFile(`${fileName}.doc`, blob)
}
