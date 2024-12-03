import React, { useState, useMemo } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import './search.css';

const SearchForm = ({ onSearch }) => {
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const searchTypes = [
        { label: 'Chọn hình thức tra cứu', value: 'null_but_true' },
        { label: 'Mã giao dịch', value: 'transaction' },
        { label: 'Số tiền thu', value: 'income' },
        { label: 'Số tiền chi', value: 'outcome' },
        { label: 'Nội dung chuyển khoản', value: 'detail' },
    ];

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Derived state to enable/disable the submit button
    const isSubmitDisabled = useMemo(() => {
        if (!startDate && !endDate && !searchType) return true;
        if (searchType && !searchValue) return true;
        if (startDate && endDate && startDate > endDate) return true;
        return false;
    }, [startDate, endDate, searchType, searchValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform full validation before submitting
        if (startDate && endDate && startDate > endDate) {
            setErrorMessage('Ngày bắt đầu phải bé hơn ngày kết thúc.');
            return;
        }
        if (!startDate && !endDate && !searchType) {
            setErrorMessage('Vui lòng chọn khoảng thời gian hoặc thêm trường tìm kiếm.');
            return;
        }
        if (searchType && !searchValue) {
            setErrorMessage('Vui lòng nhập giá trị cho trường tìm kiếm.');
            return;
        }

        setErrorMessage('');
        const searchData = {};

        if (startDate && endDate) {
            searchData.dateRange = [formatDate(startDate), formatDate(endDate)];
        }
        if (searchType && searchType !== 'null_but_true') {
            searchData.type = searchType;
            searchData.value = searchValue;
        }

        console.log('SearchData:', searchData);
        onSearch(searchData);
    };

    const handleInputChange = (field, value) => {
        setErrorMessage('');
        switch (field) {
            case 'searchType':
                setSearchType(value);
                setSearchValue('');
                break;
            case 'searchValue':
                setSearchValue(value);
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'endDate':
                setEndDate(value);
                break;
            default:
                break;
        }
    };

    const renderSearchInput = () => {
        switch (searchType) {
            case 'transaction':
                return (
                    <InputText
                        value={searchValue}
                        onChange={(e) => handleInputChange('searchValue', e.target.value)}
                        className="w-full"
                        placeholder="Nhập mã giao dịch"
                    />
                );
            case 'income':
            case 'outcome':
                return (
                    <InputText
                        type="number"
                        value={searchValue}
                        onChange={(e) => handleInputChange('searchValue', e.target.value)}
                        className="w-full"
                        placeholder={`Nhập số tiền ${searchType === 'income' ? 'thu' : 'chi'}`}
                    />
                );
            case 'detail':
                return (
                    <InputText
                        value={searchValue}
                        onChange={(e) => handleInputChange('searchValue', e.target.value)}
                        className="w-full"
                        placeholder="Nhập nội dung chuyển khoản"
                    />
                );
            default:
                return (
                    <div className="w-full h-[38px] text-sm flex items-center px-3 bg-gray-50 text-gray-500 rounded-md border border-gray-300">
                        Bạn chưa chọn hình thức tra cứu!
                    </div>
                );
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Tra cứu thông tin lịch sử giao dịch
            </h2>

            {errorMessage && (
                <div className="mb-4 text-red-600 text-center font-medium">
                    {errorMessage}
                </div>
            )}

            <div className="form-grid">
                <div className="form-item">
                    <label className="text-gray-700 font-medium text-xl">Từ ngày:</label>
                    <Calendar
                        value={startDate}
                        onChange={(e) => handleInputChange('startDate', e.value)}
                        dateFormat="dd/mm/yy"
                        className="date-input"
                        placeholder="Chọn ngày bắt đầu"
                        showIcon
                    />
                </div>
                <div className="form-item">
                    <label className="text-gray-700 font-medium text-xl">Đến ngày:</label>
                    <Calendar
                        value={endDate}
                        onChange={(e) => handleInputChange('endDate', e.value)}
                        dateFormat="dd/mm/yy"
                        className="date-input"
                        placeholder="Chọn ngày kết thúc"
                        showIcon
                    />
                </div>
                <div className="form-item">
                    <label className="text-gray-700 font-medium text-xl">Tra cứu theo:</label>
                    <Dropdown
                        value={searchType}
                        options={searchTypes}
                        onChange={(e) => handleInputChange('searchType', e.value)}
                        className="w-full"
                        placeholder="Chọn hình thức tra cứu"
                        filter
                        filterPlaceholder="Tìm kiếm..."
                    />
                </div>
                <div className="form-item">
                    <label className="text-gray-700 font-medium text-xl">Thông tin tra cứu:</label>
                    {renderSearchInput()}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isSubmitDisabled}
                    >
                        Tra cứu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;