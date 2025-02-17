export const useExcelExport = (
    data: any[],
    filename: string,
    columns?: { key: string; header: string }[],
    columnWidths?: number[]
) => {
    const { $xlsx: XLSX } = useNuxtApp();

    if (!data.length) {
        console.warn("No data to export.");
        return;
    }

    // Extract headers and data
    const headers = columns ? columns.map((col) => col.header) : Object.keys(data[0]);
    const rows = data.map((row) => columns ? columns.map((col) => row[col.key]) : Object.values(row));

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Apply column widths
    if (columnWidths) {
        ws['!cols'] = columnWidths.map((width) => ({ wch: width }));
    }

    // Header Style (Neon Green Background, Bold Black Text, Center Align)
    const headerStyle = {
        fill: { fgColor: { rgb: "0047AB" } }, // Neon Green background
        font: { bold: true, color: { rgb: "FFFFFF" } }, // Bold black text
        border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
        alignment: { horizontal: "center", vertical: "center" } // Center align header text
    };

    // Cell Style (Borders, Left Align)
    const cellStyle = {
        border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
        alignment: { horizontal: "left", vertical: "center" } // Left align text
    };

    // Column 6 Style (Yellow Background, Left Align)
    const column6Style = {
        fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
        border: { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } },
        alignment: { horizontal: "left", vertical: "center" } // Left align text
    };

    // Apply styles if the worksheet is valid
    if (ws['!ref']) {
        const range = XLSX.utils.decode_range(ws['!ref']);

        // Apply header style
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({ r: range.s.r, c: C });
            ws[cellRef] = ws[cellRef] || { t: "s", v: headers[C] }; // Ensure header exists
            ws[cellRef].s = headerStyle; // Apply Neon Green to header only
        }

        // Apply cell styles, excluding the header row
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellRef = XLSX.utils.encode_cell({ r: R, c: C });

                // Ensure cell exists
                ws[cellRef] = ws[cellRef] || { t: "s", v: "" };

                // Apply yellow background only to column 6 (index 5), but not the header row
                ws[cellRef].s = C === 6 ? column6Style : cellStyle;
            }
        }
    } else {
        console.warn("Worksheet reference is undefined.");
        return;
    }

    // Create workbook and export file
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
};
