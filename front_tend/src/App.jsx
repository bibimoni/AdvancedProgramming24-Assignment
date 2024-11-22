import React, { useState } from 'react';
import Header from "./components/header.jsx";
import SearchForm from "./components/search.jsx";
import StatementTable from "./components/table.jsx";
import Footer from "./components/footer.jsx";

// Sample data - replace with your actual data or API call
const sampleData = [
    {
        key: '1',
        data: {
            id: '1',
            time: '15/11/24 - 00:26:00',
            content: 'NGUYEN DUC THINH chuyen tien\nNG CHUYEN:CUSTOMER',
            amount: '+ 10.000'
        }
    },
    {
        key: '2',
        data: {
            id: '2',
            time: '14/11/24 - 23:59:59',
            content: 'NGUYEN THI THANH chuyen tien\nNG CHUYEN: MERCHANT',
            amount: '- 20.000'
        }
     },
    // Add more sample data as needed
];

function App() {
    const [statementData, setStatementData] = useState(sampleData);

    const handleSearch = async (searchParams) => {
        // Here you would typically make an API call with the search parameters
        // and update the statementData state with the response
        console.log('Search params:', searchParams);
        // For now, we'll just use the sample data
        setStatementData(sampleData);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full max-w-5xl mx-auto flex-grow px-4 lg:px-8">
                <Header />
                
                <main className="flex-grow">
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