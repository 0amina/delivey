import jsPDF from 'jspdf';
import 'jspdf-autotable';
const generatePdf = (rowData) => {
  if (!rowData || typeof rowData !== 'object') {
    console.error('Invalid or empty rowData');
    return;
  }

  const doc = new jsPDF();

  // Add an image to the top
  const imageUrl = '/assets/pdfTop.jpg'; // Use an absolute path
  doc.addImage(imageUrl, 'JPG', 10, 10, 190, 10);
  // Get the width of the page
  const pageWidth = doc.internal.pageSize.getWidth();

  // Calculate the X coordinate to center the text
  const text = 'Invoice';
  const fontSize = 12;
  const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
  const xCoordinate = (pageWidth - textWidth) / 2;

  // Add a header to the PDF
  doc.setFont('helvetica', 'bold'); // Set font style to bold
  doc.text(text, xCoordinate, 30); // Adjust the Y coordinate as needed
  doc.setTextColor(101, 196, 49); // Reset text color to black

  const styles = {
    font: 'helvetica',
    fontStyle: 'bold',
    overflow: 'linebreak',
    fillColor: [255, 255, 255], // Default background color for cells
    textColor: [0, 0, 0], // Default text color
    cellWidth: 'auto',
    minCellWidth: 10,
    minCellHeight: 0,
    halign: 'left',
    valign: 'top',
    fontSize: 12,
    cellPadding: 5,
    lineColor: [0, 0, 0],
    lineWidth: 0,
  };

  const headStyles = {
    fillColor: [101, 196, 49], // Header background color
    textColor: [255, 255, 255], // Header text color
  };

  const columns = [
    { header: 'Key', dataKey: 'key' },
    { header: 'Value', dataKey: 'value' },
  ];

  const data = [];

  const excludedKeys = ['client.pass', 'client.password']; // Add keys to exclude

  const processObject = (obj, prefix = '') => {
    if (!obj || typeof obj !== 'object') {
      return;
    }

    for (const [key, value] of Object.entries(obj)) {
      const nestedKey = prefix ? `${prefix}.${key}` : key;

      // Skip keys in the exclusion list
      if (excludedKeys.includes(nestedKey)) {
        continue;
      }

      if (typeof value === 'object' && !Array.isArray(value)) {
        processObject(value, nestedKey);
      } else {
        data.push({ key: nestedKey, value });
      }
    }
  };

  processObject(rowData);

  doc.autoTable({
    columns,
    body: data,
    startY: 50, // Adjust the starting position below the image
    styles,
    headStyles, // Use headStyles instead of headerStyles
    margin: { top: 10 },
  });

  const pdfBytes = doc.output();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  window.open(url, '_blank');
};

export { generatePdf };



