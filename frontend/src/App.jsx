import React, { useState } from 'react';
import Header from "./components/header.jsx";
import SearchForm from "./components/search.jsx";
import StatementTable from "./components/table.jsx";
import Footer from "./components/footer.jsx";
import AccountInformation from "./components/infor.jsx";

// Sample data - replace with your actual data or API call
const sampleData = [];

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
        try {
            let url = `http://localhost:8080/item`;
            if(searchParams.type === "transaction")
                url += `/transno?from=${searchParams.value}&to=${searchParams.value}`
            else if(searchParams.type === "time")
                url += `/date?transno?from=${searchParams.dateRange[0]}&to=${searchParams.dateRange[0]}`
            else if(searchParams.type === "income")
                url += `/credit?from=${searchParams.value}&to=${searchParams.value}`
            else if(searchParams.type === "outcome")
                url += `/debit?from=${searchParams.value}&to=${searchParams.value}`
            else if(searchParams.type === "detail")
                url += `?key=${searchParams.value}`
            
            const response = await fetch(url);
            const data = await response.json();
            
            let items = searchParams.type === "detail" ? data : data.items
            const transformedData = items.map((item, index) => ({
                key: String(index + 1), 
                data: {
                    id: String(item.trans_no), 
                    time: String(item.data_time), 
                    content: String(item.detail), 
                    amount: searchParams.type === "outcome"
                        ? `- ${item.debit}`
                        : `+ ${item.credit}`
                }
            }));

            setStatementData(transformedData)
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        }
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