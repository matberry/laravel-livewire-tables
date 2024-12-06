/*jshint esversion: 6 */

function tableWrapper() {
    Alpine.data('tableWrapper', (wire, showBulkActionsAlpine) => ({
        listeners: [],
        childElementOpen: false,
        filtersOpen: wire.entangle('filterSlideDownDefaultVisible'),
        paginationCurrentCount: wire.entangle('paginationCurrentCount'),
        paginationTotalItemCount: wire.entangle('paginationTotalItemCount'),
        paginationCurrentItems: wire.entangle('paginationCurrentItems'),
        selectedItems: wire.entangle('selected'),
        selectAllStatus: wire.entangle('selectAll'),
        delaySelectAll: wire.entangle('delaySelectAll'),
        hideBulkActionsWhenEmpty: wire.entangle('hideBulkActionsWhenEmpty'),
        toggleSelectAll() {
            console.log('toggleSelectAll called', {
                delaySelectAll: this.delaySelectAll,
                selectedItems: this.selectedItems,
                paginationTotalItemCount: this.paginationTotalItemCount
            });
            if (!showBulkActionsAlpine) {
                return;
            }

            if (this.paginationTotalItemCount === this.selectedItems.length) {
                this.clearSelected();
                this.selectAllStatus = false;
            } else {
                this.setAllSelected();
            }
        },
        setAllItemsSelected() {
            console.log('setAllItemsSelected called');
            if (!showBulkActionsAlpine) {
                return;
            }
            this.selectAllStatus = true;
            this.selectAllOnPage();
        },
        setAllSelected() {
            console.log('setAllSelected called', {
                delaySelectAll: this.delaySelectAll
            });
            if (!showBulkActionsAlpine) {
                return;
            }
            if (this.delaySelectAll) {
                this.selectAllStatus = true;
                this.selectAllOnPage();
            } else {
                wire.setAllSelected();
            }
        },
        clearSelected() {
            console.log('clearSelected called');
            if (!showBulkActionsAlpine) {
                return;
            }
            this.selectAllStatus = false;
            wire.clearSelected();
        },
        selectAllOnPage() {
            console.log('selectAllOnPage called', {
                currentItems: this.paginationCurrentItems,
                selectedItems: this.selectedItems
            });
            if (!showBulkActionsAlpine) {
                return;
            }

            let tempSelectedItems = this.selectedItems;
            const iterator = this.paginationCurrentItems.values();
            for (const value of iterator) {
                tempSelectedItems.push(value.toString());
            }
            this.selectedItems = [...new Set(tempSelectedItems)];
        },
        destroy() {
            this.listeners.forEach((listener) => {
                listener();
            });
        }
    }));
}

export default tableWrapper;
