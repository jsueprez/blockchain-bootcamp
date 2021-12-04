import React from 'react';
import TableHeader from './tableHeader';
import Tablebody from './tableBody';

const Table = ({ sortColumn, onSort, columns, data }) => {
    return (
        <table className="table">
            <TableHeader
                sortColumn={sortColumn}
                onSort={onSort}
                columns={columns}
            />
            <Tablebody data={data} columns={columns} />

        </table>);
}

export default Table;