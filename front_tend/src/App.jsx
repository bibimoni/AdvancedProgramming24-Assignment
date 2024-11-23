import React, { useState } from 'react';
import Header from "./components/header.jsx";
import SearchForm from "./components/search.jsx";
import StatementTable from "./components/table.jsx";
import Footer from "./components/footer.jsx";
import AccountInformation from "./components/infor.jsx";

// Sample data - replace with your actual data or API call
const sampleData = [
    {
        key: '1',
        data: {
            id: '1',
            time: '15/11/2024 - 00:26:00',
            content: 'NGUYEN DUC THINH chuyen tien\nNG CHUYEN:CUSTOMER',
            amount: '+ 10.000'
        }
    },
    {
        key: '2',
        data: {
            id: '2',
            time: '14/11/2024 - 23:59:59',
            content: 'NGUYEN THI THANH chuyen tien\nNG CHUYEN: MERCHANT',
            amount: '- 20.000'
        }
    },
    {
        key: '3',
        data: {
            id: '3',
            time: '15/11/2024 - 09:15:32',
            content: 'TRAN VAN AN chuyen tien\nNG CHUYEN: NHAN VIEN',
            amount: '+ 50.000'
        }
    },
    {
        key: '4',
        data: {
            id: '4',
            time: '15/11/2024 - 11:20:45',
            content: 'LE HAI MINH chuyen tien\nNG CHUYEN: KHACH HANG',
            amount: '- 15.000'
        }
    },
    {
        key: '5',
        data: {
            id: '5',
            time: '15/11/2024 - 15:48:12',
            content: 'NGUYEN VAN BINH chuyen tien\nNG CHUYEN: BAN BE',
            amount: '+ 25.000'
        }
    },
    {
        key: '6',
        data: {
            id: '6',
            time: '16/11/2024 - 10:30:20',
            content: 'PHAM THI LAN chuyen tien\nNG CHUYEN: NGUOI THAN',
            amount: '- 40.000'
        }
    },
    {
        key: '7',
        data: {
            id: '7',
            time: '16/11/2024 - 12:15:00',
            content: 'VU HOANG LINH chuyen tien\nNG CHUYEN: NHAN VIEN',
            amount: '+ 60.000'
        }
    },
    {
        key: '8',
        data: {
            id: '8',
            time: '16/11/2024 - 14:55:45',
            content: 'DO THI KIM ANH chuyen tien\nNG CHUYEN: KHACH HANG',
            amount: '- 30.000'
        }
    },
    {
        key: '9',
        data: {
            id: '9',
            time: '17/11/2024 - 08:45:32',
            content: 'HOANG MINH TUAN chuyen tien\nNG CHUYEN: CUSTOMER',
            amount: '+ 35.000'
        }
    },
    {
        key: '10',
        data: {
            id: '10',
            time: '17/11/2024 - 13:30:00',
            content: 'TRAN THI HOA chuyen tien\nNG CHUYEN: MERCHANT',
            amount: '- 50.000'
        }
    },
    {
        key: '11',
        data: {
            id: '11',
            time: '18/11/2024 - 10:20:50',
            content: 'PHAN VAN PHUC chuyen tien\nNG CHUYEN: BAN BE',
            amount: '+ 70.000'
        }
    },
    {
        key: '12',
        data: {
            id: '12',
            time: '18/11/2024 - 17:05:00',
            content: 'NGUYEN THI NGA chuyen tien\nNG CHUYEN: NGUOI THAN',
            amount: '- 20.000'
        }
    }
];

// Thêm sample data cho account information
const totalIncome = 1.35081E+11;
const totalExpense = -55000;
const balance = totalIncome + totalExpense;

const accountInfo = {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    balance: balance
};


function App() {
    const [statementData, setStatementData] = useState(sampleData);
    const [accountData, setAccountData] = useState(accountInfo); // Thêm state cho account info

    const handleSearch = async (searchParams) => {
        // Here you would typically make an API call with the search parameters
        // and update the statementData state with the response
        console.log('Search params:', searchParams);
        // For now, we'll just use the sample data
        setStatementData(sampleData);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full max-w-screen-lg mx-auto flex-grow px-4 lg:px-8">
                <Header />
                
                <main className="flex-grow">
                    <div className="mb-8">
                        <AccountInformation 
                            balance={accountData.balance}
                            totalIncome={accountData.totalIncome}
                            totalExpense={accountData.totalExpense}
                        />
                    </div>

                    <SearchForm onSearch={handleSearch} />
                    
                    <section className="mt-8">
                        <StatementTable data={statementData} />
                    </section>
                </main>
            </div>
            
            <Footer />
        </div>
    );
}

export default App;