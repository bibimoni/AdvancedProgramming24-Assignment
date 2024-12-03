import React from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const InformationCard = ({ icon, title, amount, isNegative }) => {
    const formatCurrency = (value) => {
        return Math.abs(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border-gray-400 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                        {icon}
                    </span>
                    <span className="text-gray-600 text-sm font-medium">
                        {title}
                    </span>
                </div>
                <div className={`text-xl font-semibold ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
                    {isNegative ? '-' : '+'}{formatCurrency(amount)} VND
                </div>
            </div>
        </div>
    );
};

const AccountInformation = ({ balance, totalIncome, totalExpense }) => {
    const information = [
        {
            icon: <Wallet className="w-5 h-5" />,
            title: "Số dư tài khoản",
            amount: balance,
            isNegative: false
        },
        {
            icon: <ArrowUpCircle className="w-5 h-5" />,
            title: "Tổng thu",
            amount: totalIncome,
            isNegative: false
        },
        {
            icon: <ArrowDownCircle className="w-5 h-5" />,
            title: "Tổng chi",
            amount: totalExpense,
            isNegative: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {information.map((item, index) => (
                <InformationCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    amount={item.amount}
                    isNegative={item.isNegative}
                />
            ))}
        </div>
    );
};

export default AccountInformation;