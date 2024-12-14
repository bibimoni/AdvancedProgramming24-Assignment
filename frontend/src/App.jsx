import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header.jsx";
import SearchForm from "./components/search.jsx";
import StatementTable from "./components/table.jsx";
import Footer from "./components/footer.jsx";
import AccountInformation from "./components/infor.jsx";
import About from "./components/pages/About.js";
import Contact from "./components/pages/Contact.js";
import Notification from "./components/notification";

const sampleData = [];
const totalIncome = 1.35081e11;
const totalExpense = -55000;
const balance = totalIncome + totalExpense;

const accountInfo = {
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    balance: balance,
};

function App() {
    const [statementData, setStatementData] = useState(sampleData);
    const [accountData, setAccountData] = useState(accountInfo);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const showNotification = (message, type = "error") => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: "", type: "" }), 3000);
    };

    const handleSearch = async (searchParams) => {
        try {
            let url;
            let response;
            let data;
            let items = [];
    
            if (searchParams.dateRange && searchParams.dateRange.length === 2 && !searchParams.type) {
                url = `http://localhost:9090/item/date?from=${searchParams.dateRange[0]}&to=${searchParams.dateRange[1]}`;
                response = await fetch(url);
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                data = await response.json();
                items = data && data.items && Array.isArray(data.items) ? data.items : [];
            }
    
            if (searchParams.dateRange && searchParams.dateRange.length === 2 && searchParams.type) {
                url = `http://localhost:9090/item/date?from=${searchParams.dateRange[0]}&to=${searchParams.dateRange[1]}`;
                response = await fetch(url);
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                data = await response.json();
                items = data && data.items && Array.isArray(data.items) ? data.items : [];
    
                if (searchParams.type === "transaction") {
                    items = items.filter(
                        (item) =>
                            item.trans_no && String(item.trans_no) === String(searchParams.value)
                    );
                } else if (searchParams.type === "income") {
                    items = items.filter(
                        (item) =>
                            item.credit && item.credit === searchParams.value
                    );
                } else if (searchParams.type === "outcome") {
                    items = items.filter(
                        (item) =>
                            item.debit && item.debit === searchParams.value
                    );
                } else if (searchParams.type === "detail") {
                    items = items.filter(
                        (item) =>
                            item.detail && item.detail.toString().includes(searchParams.value)
                    );
                }
            }
    
            // Nếu chỉ có type mà không có dateRange
            if (searchParams.type && !searchParams.dateRange) {
                if (searchParams.type === "transaction") {
                    url = `http://localhost:9090/item/transno?from=${searchParams.value}&to=${searchParams.value}`;
                } else if (searchParams.type === "income") {
                    url = `http://localhost:9090/item/credit?from=${searchParams.value}&to=${searchParams.value}`;
                } else if (searchParams.type === "outcome") {
                    url = `http://localhost:9090/item/debit?from=${searchParams.value}&to=${searchParams.value}`;
                } else if (searchParams.type === "detail") {
                    url = `http://localhost:9090/query?q=${searchParams.value}`;
                }
                response = await fetch(url);
                if (!response.ok) throw new Error(`API error: ${response.statusText}`);
                data = await response.json();
                items = Array.isArray(data) ? data : data.items || [];
            }

            console.log("Dữ liệu trả về từ API:", data);
            if (items.length === 0) {
                setStatementData([]);
                showNotification("Không tìm thấy kết quả phù hợp.", "info");
                return;
            }
            const transformedData = items.map((item, index) => ({
                key: String(index + 1),
                data: {
                    id: String(item.trans_no || ""),
                    time: String(item.data_time || ""),
                    content: String(item.detail || ""),
                    amount: item.debit
                        ? `- ${item.debit}`
                        : item.credit
                        ? `+ ${item.credit}`
                        : "0",
                },
            }));
            setStatementData(transformedData);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
            showNotification(
                "Không thể thực hiện tìm kiếm. Vui lòng kiểm tra lại thông tin và thử lại.",
                "error"
            );
        }
    };       

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 via-white to-purple-300 relative overflow-hidden">
                <Header />
                <div className="w-full max-w-screen-lg mx-auto flex-grow px-4 py-4 lg:px-8">
                    <main className="flex-grow">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <div className="mb-4">
                                            <AccountInformation
                                                balance={accountData.balance}
                                                totalIncome={accountData.totalIncome}
                                                totalExpense={accountData.totalExpense}
                                            />
                                        </div>
                                        <SearchForm onSearch={handleSearch} />
                                        <section className="mt-4">
                                            <StatementTable data={statementData} />
                                        </section>
                                    </>
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: "", type: "" })}
                />
            </div>
        </Router>
    );
}

export default App;