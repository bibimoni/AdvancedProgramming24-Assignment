import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { classNames } from 'primereact/utils';
import "./table.css"

const StatementTable = ({ data = [] }) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    // Template for amount column with beautiful styling
    const amountTemplate = (node) => {
        const amount = node.data.amount;
        const isPositive = amount.startsWith('+');
        return (
            <div className={classNames(
                'inline-flex items-center px-3 py-1 rounded-full font-medium',
                {
                    'bg-green-100 text-green-600': isPositive,
                    'bg-red-100 text-red-600': !isPositive
                }
            )}>
                {amount}
            </div>
        );
    };

    // Template for content column with improved formatting
    const contentTemplate = (node) => {
        const [mainText, subText] = node.data.content.split('\n');
        return (
            <div className="flex flex-col">
                <span className="font-medium text-gray-700">{mainText}</span>
                {subText && (
                    <span className="text-sm text-gray-500 mt-1">{subText}</span>
                )}
            </div>
        );
    };

    // Template for time column with better formatting
    const timeTemplate = (node) => {
        const [date, time] = node.data.time.split(' - ');
        return (
            <div className="flex flex-col">
                <span className="font-medium text-gray-700">{date}</span>
                <span className="text-sm text-gray-500">{time}</span>
            </div>
        );
    };

    // Template for ID column
    const idTemplate = (node) => {
        return (
            <span className="font-medium self-center text-gray-600">
                #{node.data.id.padStart(4, '0')}
            </span>
        );
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    // Custom empty message template
    const emptyMessage = () => (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <i className="pi pi-search text-4xl mb-4"></i>
            <span className="text-xl">No transactions found</span>
            <span className="text-sm mt-2">Try adjusting your search criteria</span>
        </div>
    );

    return (
        <div className="card shadow-lg rounded-lg overflow-hidden bg-white">
            <TreeTable 
                value={data}
                scrollable 
                scrollHeight="400px"
                className="p-treetable-sm"
                showGridlines
                resizableColumns
                columnResizeMode="expand"
                emptyMessage={emptyMessage}
            >
                <Column 
                    field="id" 
                    header="ID" 
                    body={idTemplate}
                    style={{ width: '100px' }}
                    className="font-semibold text-center"
                ></Column>
                <Column 
                    field="time" 
                    header="Thời gian" 
                    body={timeTemplate}
                    style={{ width: '200px' }}
                    className="text-center"
                ></Column>
                <Column 
                    field="content" 
                    header="Nội dung" 
                    body={contentTemplate}
                    style={{ width: '400px' }}
                ></Column>
                <Column 
                    field="amount" 
                    header="Số tiền" 
                    body={amountTemplate}
                    style={{ width: '150px' }}
                    alignHeader="right"
                    align="right"
                ></Column>
            </TreeTable>
            
            <div className="border-t border-gray-200">
                <Paginator 
                    first={first} 
                    rows={rows}
                    totalRecords={data.length}
                    rowsPerPageOptions={[10, 20, 30]}
                    onPageChange={onPageChange}
                    className="p-4"
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                />
            </div>
        </div>
    );
};

export default StatementTable;