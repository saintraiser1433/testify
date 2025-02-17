import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
export { ImageResize } from 'tiptap-extension-resize-image';
export { Placeholder as TiptapPlaceholder } from '@tiptap/extension-placeholder';
export { Table } from '@tiptap/extension-table'
export { TableRow } from '@tiptap/extension-table-row'
export const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            borderStyle: {
                default: '2px solid #ced4da',
                parseHTML: (element) => element.style.borderStyle || '2px solid #ced4da',
                renderHTML: (attributes) => ({
                    style: `border: ${attributes.borderStyle}`,
                }),
            },
            backgroundColor: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-background-color'),
                renderHTML: (attributes) => ({
                    'data-background-color': attributes.backgroundColor,
                    style: `background-color: bg-gray-900`,
                }),
            },
            style: {
                default: 'height: 28px; padding: 3px 5px',
            },
        };
    },
});

export const CustomTableHeader = TableHeader.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            borderStyle: {
                default: '2px solid #ced4da',
                parseHTML: (element) => element.style.borderStyle || '2px solid #ced4da',
                renderHTML: (attributes) => ({
                    style: `border: ${attributes.borderStyle}`,
                }),
            },
            style: {
                default: 'height: 28px; padding: 3px 5px; background-color: gray; color: white',
            },
        };
    },
});





