const PDFDocument = require('pdfkit');
const fs = require('fs');
 
// Create a document
const doc = new PDFDocument();
 
const createPDF = (pdfName,total) =>{
    const Header = "Pesananan Anda telah diteruskan ke Admin"
    const content = "Terima kasih telah berbelanja di Otrifity"
    const grandTotal = `Total pembayaran Anda sebesar ${total}`
    

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(`./public/invoice/${pdfName}.pdf`));
     
    // Embed a font, set the font size, and render some text
    doc
        .image('./public/tes/notif.png', {width: 300,align:'center'})
        .moveDown(2)

    doc
        .font('Times-Bold')
        .fontSize(20)
        .text(`${Header}`, {
            width: 410,
            align: 'center'
        })
        .moveDown(0.5);
        
        
    doc
        .font('Times-Roman')
        .fontSize(12)
        .text(`${content}`, {
            width: 410,
            align: 'center'
        })
        .moveDown(0.5);

    doc
        .text(grandTotal.slice(0,30 ), {
          width: 461,
          continued: true
        }).fillColor('orange')
        .text(grandTotal.slice(30),{
            width:500
        });
     
    // Finalize PDF file
    doc.end();
}

module.exports = {
    createPDF
}