import { jsPDF } from "jspdf";
import gstc from "~/assets/logo/gstc.png";
import seait from "~/assets/logo/seait.png";
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/franklingothic.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";



export const printScoreSlip = (nameExaminee: string, courseDescription: string, date: string) => {

    const doc = new jsPDF({
        unit: "px",
        format: [220, 260],
    });

    //   doc.rect(0, 0, 286, 355, "F");

    // Add border to match the image
    doc.setLineWidth(0.5);
    doc.rect(2, 2, 216, 256);


    //header
    doc.setFont("oldenglishtextmt", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 100, 0);
    doc.text("South East Asian Institute of Technology, Inc.", 108, 48, {
        align: "center",
    });

    doc.setFont("Franklin Gothic Bold", "bold");
    doc.setFontSize(11);
    doc.text("Guidance Services and Testing Center", 108, 60, { align: "center" });

    //date
    doc.setFont("tahoma", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const textWidth = doc.getTextWidth(`Date: ${date}`);
    doc.text(`Date: ${date}`, 10, 80);
    doc.line(10, 82, 10 + textWidth, 82);

    // Body text parts
    const preText = "This is to certify that ";
    const name = nameExaminee;
    const midText = ", has taken the Entrance Examinations 2024 and is qualified to take the course ";
    const course = courseDescription;
    const endText = " for Academic Year 2024-2025.";

    const margin = 10;
    const maxWidth = 200;
    const startY = 100;
    const lineHeight = 12;

    const formatText = () => {
        let lines = [];
        let currentLine = '';
        let currentWidth = 0;
        let lineFormats = [];

        // Helper function to add text to a line
        const addText = (text: string, isBold = false, shouldUnderline = false) => {
            doc.setFont("tahoma", isBold ? "bold" : "normal");
            const textWidth = doc.getTextWidth(text + ' ');

            // If adding the text exceeds the max width, push the current line and start a new one
            if (currentWidth + textWidth > maxWidth) {
                lines.push(currentLine.trim());
                lineFormats.push([...currentLineFormats]);
                currentLine = '';
                currentWidth = 0;
                currentLineFormats = [];
            }

            currentLine += text + ' ';
            currentWidth += textWidth;
            currentLineFormats.push({ text, isBold, shouldUnderline });
        };

        let currentLineFormats: any = [];

        // Add each part with appropriate formatting
        preText.split(' ').forEach(word => addText(word));
        addText(name, true, true); // Add the name as a single unit with underline and bold
        midText.split(' ').forEach(word => addText(word));
        addText(course, true, true); // Add the course as a single unit with underline and bold
        endText.split(' ').forEach(word => addText(word));

        // Add the last line if it's not empty
        if (currentLine.trim()) {
            lines.push(currentLine.trim());
            lineFormats.push([...currentLineFormats]);
        }

        // Draw each line with formatting and justification
        lines.forEach((line, lineIndex) => {
            const yPos = startY + (lineIndex * lineHeight);
            const formats = lineFormats[lineIndex];

            // Calculate the total width of the line
            const totalLineWidth = formats.reduce((width, format) => {
                doc.setFont("tahoma", format.isBold ? "bold" : "normal");
                return width + doc.getTextWidth(format.text + ' ');
            }, 0);

            // Calculate the extra spacing between words for justification
            const extraSpacing =
                lineIndex < lines.length - 1 && formats.length > 1
                    ? (maxWidth - totalLineWidth) / (formats.length - 1)
                    : 0; // No justification for the last line

            // Draw each word with formatting and spacing
            let xPos = margin;
            formats.forEach((format, index) => {
                doc.setFont("tahoma", format.isBold ? "bold" : "normal");

                // Draw the text
                doc.text(format.text, xPos, yPos);

                // Add underline if needed
                if (format.shouldUnderline) {
                    const textWidth = doc.getTextWidth(format.text);
                    doc.setLineWidth(0.5);
                    doc.line(xPos, yPos + 1, xPos + textWidth, yPos + 1);
                }

                // Add spacing for justification (skip on the last word of a justified line)
                xPos += doc.getTextWidth(format.text + ' ') + (index < formats.length - 1 ? extraSpacing : 0);
            });
        });
    };

    // Format and draw the text
    formatText();

    doc.addImage(seait, "PNG", 78, 7, 30, 30);
    doc.addImage(gstc, "PNG", 108, 3, 42, 42);

    //checked by section
    doc.setFont("tahoma", "normal");
    doc.setFontSize(9);
    doc.text("Checked by:", 10, 165);
    doc.line(75, 165, 200, 165);

    doc.setFont("tahoma", "bold");
    doc.setFontSize(8);
    doc.text("Guidance Personnel In-Charge", 140, 171, {
        align: "center",
    });

    //noted section
    doc.setFont("tahoma", "normal");
    doc.setFontSize(9);
    doc.text("Noted by:", 10, 190);
    doc.line(75, 190, 200, 190);

    doc.setFont("tahoma", "bold");
    doc.setFontSize(8);
    doc.text("Rovi D. Soliterio, MA, RGC", 140, 197, {
        align: "center",
    });

    //program head section
    doc.setFont("tahoma", "normal");
    doc.setFontSize(9);
    doc.text("Approved by:", 10, 220);
    doc.line(75, 220, 200, 220);

    doc.setFont("tahoma", "bold");
    doc.setFontSize(8);
    doc.text("Program Head/Dean", 140, 226, {
        align: "center",
    });

    window.open(doc.output('bloburl'))
}


