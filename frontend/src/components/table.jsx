import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';
import "./table.css"

const StatementTable = ({ data = [] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rows] = useState(15);

    const totalPages = Math.ceil(data.length / rows);
    
    const showPagination = data.length > rows;

    const amountTemplate = (node) => {
        const amount = node.data.amount;
        const isPositive = amount.startsWith('+');
        return (
            <div className={classNames(
                'inline-flex items-center px-3 py-1.5 rounded-full font-medium transition-all duration-200 hover:opacity-90',
                {
                    'bg-green-100 text-green-600 hover:bg-green-200': isPositive,
                    'bg-red-100 text-red-600 hover:bg-red-200': !isPositive
                }
            )}>
                <span className="min-w-[80px] text-center">
                    {amount}
                </span>
            </div>
        );
    };

    const contentTemplate = (node) => {
        const [mainText, subText] = node.data.content.split('\n');
        return (
            <div className="flex flex-col py-1 group transition-all duration-200">
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                    {mainText}
                </span>
                {subText && (
                    <span className="text-sm text-gray-500 mt-1 group-hover:text-gray-600">
                        {subText}
                    </span>
                )}
            </div>
        );
    };

    const timeTemplate = (node) => {
        const [date, time] = node.data.time.split(' - ');
        const [day, month, year] = date.split('/');
        const fullYear = year.length === 2 ? `20${year}` : year;
        const formattedDate = `${day}/${month}/${fullYear}`;
    
        return (
            <div className="flex flex-col py-1">
                <span className="font-medium text-gray-700">
                    {formattedDate}
                </span>
                <span className="text-sm text-gray-500 mt-0.5">
                    {time}
                </span>
            </div>
        );
    };

    const idTemplate = (node) => {
        return (
            <span className="font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
                #{node.data.id.padStart(4, '0')}
            </span>
        );
    };

    const emptyMessage = () => (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <i className="pi pi-search text-5xl mb-4 opacity-50"></i>
            <span className="text-xl font-medium">Không tìm thấy giao dịch</span>
            <span className="text-sm mt-2 text-gray-400">Vui lòng điều chỉnh thông tin tìm kiếm</span>
        </div>
    );

    const CustomPagination = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
    
        const halfRange = Math.floor(maxPagesToShow / 2);
        const startPage = Math.max(1, currentPage - halfRange);
        const endPage = Math.min(totalPages, currentPage + halfRange);
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="flex items-center justify-center gap-4 py-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    ← Prev
                </button>
    
                {startPage > 1 && (
                    <button
                        onClick={() => setCurrentPage(1)}
                        className="px-3 py-2 rounded hover:bg-gray-100"
                    >
                        1
                    </button>
                )}
                {startPage > 2 && <span className="px-4 ">...</span>}
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={classNames(
                            'w-12 h-12 rounded-full flex items-center justify-center',
                            {
                                'bg-blue-500 text-white': currentPage === number,
                                'hover:bg-gray-100': currentPage !== number
                            }
                        )}
                    >
                        {number}
                    </button>
                ))}
    
                {endPage < totalPages - 1 && <span className="px-4">...</span>}
                {endPage < totalPages && (
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="mx-10 py-1 rounded hover:bg-gray-100"
                    >
                        {totalPages}
                    </button>
                )}
    
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        );
    };    
    const getCurrentPageData = () => {
        const start = (currentPage - 1) * rows;
        const end = start + rows;
        return data.slice(start, end);
    };

    return (
        <div className="card shadow-lg rounded-xl overflow-hidden bg-white border border-gray-200 max-w-screen-xl mx-auto mt-6 mb-2 p-4">
            <TreeTable 
                value={getCurrentPageData()}
                scrollable 
                scrollHeight="500px"
                className="p-treetable-sm w-full"
                showGridlines
                resizableColumns
                columnResizeMode="expand"
                emptyMessage={emptyMessage}
            >
                <Column 
                    field="id" 
                    header="ID" 
                    body={idTemplate}
                    style={{ width: '80px' }}
                    className="font-semibold text-center"
                ></Column>
                <Column  
                    field="time" 
                    header="Thời gian" 
                    body={timeTemplate}
                    style={{ width: '200px' }}
                    className="text-wrap"
                ></Column>
                <Column 
                    field="content" 
                    header="Nội dung" 
                    body={contentTemplate}
                    style={{ width: '450px' }}
                ></Column>
                <Column 
                    field="amount" 
                    header="Số tiền" 
                    body={amountTemplate}
                    style={{ width: '120px' }}
                    className="text-center"
                    alignHeader="center"
                ></Column>
            </TreeTable>
            
            {showPagination && (
                <div className="border-t border-gray-200">
                    <CustomPagination />
                </div>
            )}
        </div>
    );
};

export default StatementTable;