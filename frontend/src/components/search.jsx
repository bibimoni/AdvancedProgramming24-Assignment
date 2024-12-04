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
    const [errors, setErrors] = useState({
        startDate: '',
        endDate: '',
        searchType: '',
        searchValue: '',
    });

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

    const isSubmitDisabled = useMemo(() => {
        if (!startDate && !endDate && !searchType) return true;
        if (searchType && !searchValue) return true;
        if (startDate && endDate && startDate > endDate) return true;
        return false;
    }, [startDate, endDate, searchType, searchValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            startDate: '',
            endDate: '',
            searchType: '',
            searchValue: '',
        };

        if (startDate && endDate && startDate > endDate) {
            newErrors.startDate = 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc.';
            newErrors.endDate = 'Ngày kết thúc phải lớn hơn ngày bắt đầu.';
        }

        if (!startDate && !endDate && !searchType) {
            newErrors.startDate = 'Vui lòng chọn ngày bắt đầu.';
            newErrors.endDate = 'Vui lòng chọn ngày kết thúc.';
            newErrors.searchType = 'Vui lòng chọn hình thức tra cứu.';
        }

        if (searchType && !searchValue) {
            newErrors.searchValue = 'Vui lòng nhập giá trị cho trường tìm kiếm.';
        }

        if (['income', 'outcome', 'transaction'].includes(searchType) && isNaN(searchValue)) {
            newErrors.searchValue = 'Giá trị nhập vào phải là số.';
        }

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const searchData = {};

        if (startDate && endDate) {
            searchData.dateRange = [formatDate(startDate), formatDate(endDate)];
        }

        if (searchType && searchType !== 'null_but_true') {
            searchData.type = searchType;
            searchData.value = searchType === 'detail' ? searchValue.trim() : parseInt(searchValue, 10);
        }

        console.log('SearchData:', searchData);
        onSearch(searchData);
    };

    const handleInputChange = (field, value) => {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
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
        const isError = !!errors.searchValue;

        switch (searchType) {
            case 'transaction':
                return (
                    <>
                        <InputText
                            value={searchValue}
                            onChange={(e) => handleInputChange('searchValue', e.target.value)}
                            className={`input-box ${isError ? 'input-error' : ''}`}
                            placeholder="Nhập mã giao dịch"
                        />
                        {isError && <small className="text-red-500">{errors.searchValue}</small>}
                    </>
                );
            case 'income':
            case 'outcome':
                return (
                    <>
                        <InputText
                            type="number"
                            value={searchValue}
                            onChange={(e) => handleInputChange('searchValue', e.target.value)}
                            className={`input-box ${isError ? 'input-error' : ''}`}
                            placeholder={`Nhập số tiền ${searchType === 'income' ? 'thu' : 'chi'}`}
                        />
                        {isError && <small className="text-red-500">{errors.searchValue}</small>}
                    </>
                );
            case 'detail':
                return (
                    <>
                        <InputText
                            value={searchValue}
                            onChange={(e) => handleInputChange('searchValue', e.target.value)}
                            className={`input-box ${isError ? 'input-error' : ''}`}
                            placeholder="Nhập nội dung chuyển khoản"
                        />
                        {isError && <small className="text-red-500">{errors.searchValue}</small>}
                    </>
                );
            default:
                return (
                    <div className="w-full h-[38px] text-sm flex items-center px-3 bg-gray-50 text-gray-500 rounded-lg border-radius border-gray-300">
                        Bạn chưa chọn hình thức tra cứu!
                    </div>
                );
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
                Tra cứu thông tin lịch sử giao dịch
            </h2>

            <div className="form-grid">
                <div className="form-item">
                    <label className="heading-text">Từ ngày</label>
                    <Calendar
                        value={startDate}
                        onChange={(e) => handleInputChange('startDate', e.value)}
                        dateFormat="dd/mm/yy"
                        className={`date-input ${errors.startDate ? 'input-error' : ''}`}
                        placeholder="Chọn ngày bắt đầu"
                        showIcon
                    />
                    {errors.startDate && <small className="text-red-500">{errors.startDate}</small>}
                </div>
                <div className="form-item">
                    <label className="heading-text">Đến ngày</label>
                    <Calendar
                        value={endDate}
                        onChange={(e) => handleInputChange('endDate', e.value)}
                        dateFormat="dd/mm/yy"
                        className={`date-input ${errors.endDate ? 'input-error' : ''}`}
                        placeholder="Chọn ngày kết thúc"
                        showIcon
                    />
                    {errors.endDate && <small className="text-red-500">{errors.endDate}</small>}
                </div>
                <div className="form-item">
                    <label className="heading-text">Tra cứu theo</label>
                    <Dropdown
                        value={searchType}
                        options={searchTypes}
                        onChange={(e) => handleInputChange('searchType', e.value)}
                        className={`w-full ${errors.searchType ? 'input-error' : ''}`}
                        placeholder="Chọn hình thức tra cứu"
                        filter
                        filterPlaceholder="Tìm kiếm..."
                    />
                    {errors.searchType && <small className="text-red-500">{errors.searchType}</small>}
                </div>
                <div className="form-item">
                    <label className="heading-text">Thông tin tra cứu</label>
                    {renderSearchInput()}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-bold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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