import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable() // necesario para angular v9
export class MatPaginatorImpl extends MatPaginatorIntl {

    /** A label for the page size selector. */
    itemsPerPageLabel = 'Items por página';
    /** A label for the button that increments the current page. */
    nextPageLabel = 'Siguiente';
    /** A label for the button that decrements the current page. */
    previousPageLabel = 'Atrás';

    getRangeLabel = function (page, pageSize, length) {
        if (length == 0 || pageSize === 0) {
            return '0 de ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;

        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
    }

}