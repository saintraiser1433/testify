import { jsPDF } from 'jspdf';
import gstc from '~/assets/logo/gstc.png';
import seait from '~/assets/logo/seait.png';
import '~/assets/fonts/oldenglishtextmt-bold.js';
import '~/assets/fonts/franklingothic.js';
import '~/assets/fonts/tahoma-normal.js';
import '~/assets/fonts/tahoma-bold.js';
import '~/assets/fonts/frankin-book-normal';
import '~/assets/fonts/franklin-bold-bold';

export const printScoreSlip = (
  nameExaminee: string,
  courseDescription: string,
  date: string
) => {
  const doc = new jsPDF({
    unit: 'px',
    format: [230, 300],
  });

  // Border
  doc.setLineWidth(0.5);
  doc.rect(2, 2, 226, 296);

  // Header
  doc.setFont('oldenglishtextmt', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('South East Asian Institute of Technology, Inc.', 108, 48, {
    align: 'center',
  });

  doc.setFont('tahoma', 'bold');
  doc.setFontSize(11);
  doc.text('Guidance Services and Testing Center', 108, 60, {
    align: 'center',
  });

  // Date
  doc.setFont('frankin-book', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const textWidth = doc.getTextWidth(`Date: ${date}`);
  doc.text(`Date: ${date}`, 10, 80);
  doc.line(10, 82, 10 + textWidth, 82);

  // Main content with formatting
  const leftMargin = 10;
  const maxWidth = 206;
  let yPos = 100;
  const lineHeight = 12;

  // Create text segments with formatting info
  const textParts = [
    { text: 'This is to certify that ', bold: false, underline: false },
    { text: nameExaminee, bold: true, underline: true },
    {
      text: ' has taken the Entrance Examinations 2025 and is qualified to take the course ',
      bold: false,
      underline: false,
    },
    { text: courseDescription, bold: true, underline: true },
    { text: ' for Academic Year 2025-2026.', bold: false, underline: false },
  ];

  // Function to render text with full underlines
  const renderWithFullUnderlines = (y: number) => {
    let currentY = y;

    // First pass: split into lines with formatting info
    let currentLine: { text: string; bold: boolean; underline: boolean }[] = [];
    let currentLineWidth = 0;
    const formattedLines: { parts: typeof currentLine; width: number }[] = [];

    textParts.forEach((part) => {
      doc.setFont(
        part.bold ? 'franklin-bold' : 'frankin-book',
        part.bold ? 'bold' : 'normal'
      );
      const words = part.text.split(' ');

      words.forEach((word) => {
        const wordWidth = doc.getTextWidth(word + ' ');

        if (currentLineWidth + wordWidth > maxWidth && currentLine.length > 0) {
          formattedLines.push({
            parts: [...currentLine],
            width: currentLineWidth,
          });
          currentLine = [];
          currentLineWidth = 0;
        }

        currentLine.push({
          text: word + ' ',
          bold: part.bold,
          underline: part.underline,
        });
        currentLineWidth += wordWidth;
      });
    });

    if (currentLine.length > 0) {
      formattedLines.push({
        parts: [...currentLine],
        width: currentLineWidth,
      });
    }

    // Second pass: render with full underlines
    formattedLines.forEach((line, lineIndex) => {
      const isLastLine = lineIndex === formattedLines.length - 1;
      let xPos = leftMargin;

      // Calculate spacing for justification
      const extraSpace = !isLastLine
        ? (maxWidth - line.width) / (line.parts.length - 1)
        : 0;

      // Track underline segments
      let underlineStart = 0;
      let underlineWidth = 0;
      let inUnderline = false;

      line.parts.forEach((part, partIndex) => {
        doc.setFont(
          part.bold ? 'franklin-bold' : 'frankin-book',
          part.bold ? 'bold' : 'normal'
        );

        // Draw text
        doc.text(part.text, xPos, currentY);

        // Handle underline tracking
        if (part.underline) {
          if (!inUnderline) {
            underlineStart = xPos;
            inUnderline = true;
          }
          underlineWidth += doc.getTextWidth(part.text);
        } else {
          if (inUnderline) {
            doc.line(
              underlineStart,
              currentY + 1,
              underlineStart + underlineWidth,
              currentY + 1
            );
            inUnderline = false;
          }
        }

        xPos +=
          doc.getTextWidth(part.text) +
          (partIndex < line.parts.length - 1 ? extraSpace : 0);
      });

      // Draw any remaining underline
      if (inUnderline) {
        doc.line(
          underlineStart,
          currentY + 1,
          underlineStart + underlineWidth,
          currentY + 1
        );
      }

      currentY += lineHeight;
    });

    return currentY;
  };

  // Render the formatted text
  yPos = renderWithFullUnderlines(yPos);

  // Add logos
  doc.addImage(seait, 'PNG', 78, 7, 30, 30);
  doc.addImage(gstc, 'PNG', 110, 7, 32, 32);

  // Signature sections with table-like formatting
  const addSignatureSection = (
    label: string,
    name: string,
    title: string,
    y: number
  ) => {
    doc.setFont('franklin-bold', 'bold');
    doc.setFontSize(10);
    doc.text(`${label}:`, leftMargin, y);

    if (name) {
      doc.setFont('frankin-book', 'normal');
      // Fix spacing in names
      const formattedName = name
        .replace(/\./g, '. ')
        .replace(/,/g, ', ')
        .trim();
      doc.text(formattedName, 75, y);
      doc.line(75, y + 3, 75 + doc.getTextWidth(formattedName), y + 3);
    } else {
      doc.line(75, y + 3, 200, y + 3);
    }

    if (title) {
      doc.setFont('franklin-bold', 'bold');
      doc.text(title, 75, y + 11);
    }
  };

  // Position signature sections
  addSignatureSection(
    'Checked by',
    'MARIANNE DAPHNE B.VILLAHERMOSA',
    'Guidance Personnel In-Charge',
    190
  );
  addSignatureSection('Noted by', '', 'ROVI D. SILOTERIO, MAED, RGC', 220);
  addSignatureSection('Approved By', '', 'PROGRAM HEAD/DEAN', 260);

  window.open(doc.output('bloburl'));
};
