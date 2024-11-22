import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import "./search.css";

const SearchForm = ({ onSearch }) => {
    const [searchType, setSearchType] = useState('transaction');
    const [searchValue, setSearchValue] = useState('');
    const [dateRange, setDateRange] = useState(null);

    const searchTypes = [
        { label: 'Mã giao dịch', value: 'transaction' },
        { label: 'Số tiền thu', value: 'income' },
        { label: 'Số tiền chi', value: 'outcome' },
        { label: 'Nội dung chuyển khoản', value: 'detail' },
        { label: 'Khoảng thời gian', value: 'time' },
        { label: 'Chọn_hình_thức_tra_cứu', value: ''}
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchData = {
            type: searchType,
            value: searchValue,
            dateRange: dateRange,
        };
        onSearch(searchData);
    };

    const renderSearchInput = () => {
        switch (searchType) {
            case 'transaction':
                return (
                    <InputText
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full p-inputtext-sm"
                        placeholder="Nhập mã giao dịch"
                    />
                )
            case 'time':
                return (
                    <Calendar
                        value={dateRange}
                        onChange={(e) => setDateRange(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        placeholder="Chọn khoảng thời gian"
                        dateFormat="dd/mm/yy"
                        className="w-full"
                    />
                );
            case 'income':
            case 'outcome':
                return (
                    <InputText
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full p-inputtext-sm"
                        placeholder={`Nhập số tiền ${searchType === 'income' ? 'thu' : 'chi'}`}
                    />
                );
            case 'detail':
                return (
                    <InputText
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-full p-inputtext-sm"
                        placeholder={`Nhập ${searchTypes.find(t => t.value === searchType)?.label.toLowerCase()}`}
                    />
                );
            default:
                return (
                    <div className="text-gray-500 w-full p-2">
                        Chọn hình thức tra cứu
                    </div>
                )
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center font-sans">
                Tra cứu thông tin sao kê
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium mr-8">
                            Tra cứu theo
                        </label>
                        <Dropdown
                            value={searchType}
                            options={searchTypes}
                            onChange={(e) => {
                                setSearchType(e.value);
                                setSearchValue('');
                                setDateRange(null);
                            }}
                            className= "w-full "
                            placeholder= "Chọn hình thức tìm kiếm"
                            filter
                            filterPlaceholder="Tìm kiếm..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                        {searchType ? searchTypes.find(t => t.value === searchType)?.label : ''}
                        </label>
                        {renderSearchInput()}
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    >
                        Tra cứu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;