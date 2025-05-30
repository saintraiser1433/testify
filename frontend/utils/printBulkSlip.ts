import { jsPDF } from "jspdf";
import gstc from "~/assets/logo/gstc.png";
import seait from "~/assets/logo/seait.png";
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/franklingothic.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";
import "~/assets/fonts/frankin-book-normal";
import "~/assets/fonts/franklin-bold-bold";


export const printBulkSlip = (data: GenerateSlip[]) => {
    const doc = new jsPDF({
        unit: "px",
        format: "letter",
        orientation: "portrait"
    });

    // Constants for 2x2 grid layout
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const slipsPerPage = 4;
    const slipWidth = pageWidth / 2 - 15;
    const slipHeight = pageHeight / 2 - 15;
    const margin = 10;

    // Positions for each slip in the grid
    const slipPositions = [
        { x: margin, y: margin }, // Top-left
        { x: pageWidth / 2 + 5, y: margin }, // Top-right
        { x: margin, y: pageHeight / 2 + 5 }, // Bottom-left
        { x: pageWidth / 2 + 5, y: pageHeight / 2 + 5 } // Bottom-right
    ];

    const renderSlip = (doc: jsPDF, slipData: GenerateSlip, offsetX: number, offsetY: number) => {
        // Border
        doc.setLineWidth(0.5);
        doc.rect(offsetX, offsetY, slipWidth, slipHeight);

        // Header with logos
        doc.addImage(seait, "PNG", offsetX + slipWidth/2 - 30, offsetY + 5, 30, 30);
        doc.addImage(gstc, "PNG", offsetX + slipWidth/2 + 5, offsetY + 5, 32, 32);

        // Institution name
        doc.setFont("oldenglishtextmt", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 100, 0);
        doc.text("South East Asian Institute of Technology, Inc.", 
                offsetX + slipWidth/2, offsetY + 48, { align: "center" });

        // Department name
        doc.setFont("tahoma", "bold");
        doc.setFontSize(11);
        doc.text("Guidance Services and Testing Center", 
                offsetX + slipWidth/2, offsetY + 60, { align: "center" });

        // Date
        doc.setFont("frankin-book", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const dateText = `Date: May-01-2025`;
        doc.text(dateText, offsetX + 10, offsetY + 80);
        doc.line(offsetX + 10, offsetY + 82, offsetX + 10 + doc.getTextWidth(dateText), offsetY + 82);

        // Main content with formatting
        const leftMargin = offsetX + 10;
        const maxWidth = slipWidth - 20;
        let yPos = offsetY + 100;
        const lineHeight = 12;

        // Text parts with formatting info
        const textParts = [
            { text: "This is to certify that ", bold: false, underline: false },
            { text: slipData.fullname, bold: true, underline: true },
            { text: " has taken the Entrance Examinations 2025 and is qualified to take the course ", bold: false, underline: false },
            { text: slipData.course, bold: true, underline: true },
            { text: " for Academic Year 2025-2026.", bold: false, underline: false }
        ];

        // Function to render text with full underlines
        const renderWithFullUnderlines = (startY: number) => {
            let currentY = startY;
            let currentLine: {text: string, bold: boolean, underline: boolean}[] = [];
            let currentLineWidth = 0;
            const formattedLines: {parts: typeof currentLine, width: number}[] = [];
            
            textParts.forEach(part => {
                doc.setFont(part.bold ? "franklin-bold" : "frankin-book", part.bold ? "bold" : "normal");
                const words = part.text.split(' ');
                
                words.forEach(word => {
                    const wordWidth = doc.getTextWidth(word + ' ');
                    
                    if (currentLineWidth + wordWidth > maxWidth && currentLine.length > 0) {
                        formattedLines.push({
                            parts: [...currentLine],
                            width: currentLineWidth
                        });
                        currentLine = [];
                        currentLineWidth = 0;
                    }
                    
                    currentLine.push({
                        text: word + ' ',
                        bold: part.bold,
                        underline: part.underline
                    });
                    currentLineWidth += wordWidth;
                });
            });
            
            if (currentLine.length > 0) {
                formattedLines.push({
                    parts: [...currentLine],
                    width: currentLineWidth
                });
            }
            
            formattedLines.forEach((line, lineIndex) => {
                const isLastLine = lineIndex === formattedLines.length - 1;
                let xPos = leftMargin;
                const extraSpace = !isLastLine ? (maxWidth - line.width) / (line.parts.length - 1) : 0;
                
                let underlineStart = 0;
                let underlineWidth = 0;
                let inUnderline = false;
                
                line.parts.forEach((part, partIndex) => {
                    doc.setFont(part.bold ? "franklin-bold" : "frankin-book", part.bold ? "bold" : "normal");
                    doc.text(part.text, xPos, currentY);
                    
                    if (part.underline) {
                        if (!inUnderline) {
                            underlineStart = xPos;
                            inUnderline = true;
                        }
                        underlineWidth += doc.getTextWidth(part.text);
                    } else {
                        if (inUnderline) {
                            doc.line(underlineStart, currentY + 1, underlineStart + underlineWidth, currentY + 1);
                            inUnderline = false;
                        }
                    }
                    
                    xPos += doc.getTextWidth(part.text) + (partIndex < line.parts.length - 1 ? extraSpace : 0);
                });
                
                if (inUnderline) {
                    doc.line(underlineStart, currentY + 1, underlineStart + underlineWidth, currentY + 1);
                }
                
                currentY += lineHeight;
            });
            
            return currentY;
        };

        // Render the formatted text
        yPos = renderWithFullUnderlines(yPos);

        // Signature sections
        const addSignatureSection = (label: string, name: string, title: string, y: number) => {
            doc.setFont("franklin-bold", "bold");
            doc.setFontSize(10);
            doc.text(`${label}:`, offsetX + 10, y);
            
            if (name) {
                doc.setFont("frankin-book", "normal");
                const formattedName = name.replace(/\./g, '. ').replace(/,/g, ', ').trim();
                doc.text(formattedName, offsetX + 75, y);
                doc.line(offsetX + 75, y + 3, offsetX + 75 + doc.getTextWidth(formattedName), y + 3);
            } else {
                doc.line(offsetX + 75, y + 3, offsetX + 200, y + 3);
            }
            
            if (title) {
                doc.setFont("franklin-bold", "bold");
                doc.text(title, offsetX + 75, y + 11);
            }
        };

        // Add signature sections
        addSignatureSection("Checked by", "MARIANNE DAPHNE B.VILLAHERMOSA", "Guidance Personnel In-Charge", offsetY + 190);
        addSignatureSection("Noted by", "", "ROVI D.SILOTERIO,MAED,RGC", offsetY + 220);
        addSignatureSection("Approved By", "", "PROGRAM HEAD/DEAN", offsetY + 260);
    };

    // Process all data entries
    data.forEach((entry, index) => {
        // Add new page if current page is full
        if (index > 0 && index % slipsPerPage === 0) {
            doc.addPage();
        }

        // Get position for current slip
        const positionIndex = index % slipsPerPage;
        const position = slipPositions[positionIndex];
        
        // Render the slip at calculated position
        renderSlip(doc, entry, position.x, position.y);
    });

    // Open the PDF in new window
    window.open(doc.output('bloburl'));
};