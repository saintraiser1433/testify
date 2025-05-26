import { jsPDF } from "jspdf";
import gstc from "~/assets/logo/gstc.png";
import "~/assets/fonts/oldenglishtextmt-bold.js";
import "~/assets/fonts/franklingothic.js";
import "~/assets/fonts/tahoma-normal.js";
import "~/assets/fonts/tahoma-bold.js";

export const printCredentials = (data: User[]) => {
    const doc = new jsPDF({
        unit: "px",
        orientation: "l",
        format: "a4",
    });

    // A4 landscape dimensions in pixels
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Card dimensions and spacing
    const cardWidth = 130;
    const cardHeight = 60;
    const paddingX = 10;
    const paddingY = 10;

    // Calculate maximum cards per page
    const columns = Math.floor((pageWidth - paddingX) / (cardWidth + paddingX));
    const rows = Math.floor((pageHeight - paddingY) / (cardHeight + paddingY));
    const cardsPerPage = columns * rows;

    // Calculate total width and height needed for cards
    const totalCardsWidth = columns * cardWidth + (columns - 1) * paddingX;
    const totalCardsHeight = rows * cardHeight + (rows - 1) * paddingY;

    // Calculate starting position to center the grid
    const startX = (pageWidth - totalCardsWidth) / 2;
    const startY = (pageHeight - totalCardsHeight) / 2;

    const drawCard = (x: number, y: number, user: User) => {
        // Draw border
        doc.setLineWidth(0.5);
        doc.rect(x, y, cardWidth, cardHeight);

        // Add Image
        doc.addImage(gstc, "PNG", x + 2, y + 3, 24, 24);

        // Header (Centered)
        doc.setFont("Franklin Gothic Bold", "bold");
        doc.setFontSize(8.5);
        doc.text("SEAIT-EECRS CREDENTIALS", (x + 11) + cardWidth / 2, y + 18, {
            align: "center",
        });

        // Username & Password
        doc.setFont("tahoma", "normal");
        doc.setFontSize(8);
        doc.text(`Name: ${user.fullname} `, x + 5, y + 35);
        doc.text(`Username: ${user.username}`, x + 5, y + 45);
        doc.text(`Password: ${user.password}`, x + 5, y + 55);
    };

    // Calculate total pages based on actual data length
    const totalPages = Math.ceil(data.length / cardsPerPage);

    for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
            doc.addPage();
        }

        // Calculate how many cards to draw on this page
        const startIndex = page * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, data.length);

        // Draw cards for this page
        for (let i = startIndex; i < endIndex; i++) {
            const col = (i - startIndex) % columns;
            const row = Math.floor((i - startIndex) / columns);

            const x = startX + col * (cardWidth + paddingX);
            const y = startY + row * (cardHeight + paddingY);

            drawCard(x, y, data[i]);
        }
    }

    window.open(doc.output("bloburl"));
};