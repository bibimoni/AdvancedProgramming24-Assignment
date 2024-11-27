import React from "react";

function App() {
    return (
        <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between py-4">
                <div>
                    <h1 className="text-xl font-semibold">
                        <a href="/" className="text-gray-900 hover:text-gray-700">
                            Charity Bank Statement
                        </a>
                    </h1>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Credit</a>
                    </li>
                </ul>
            </nav>

            <main className="mt-8">
                <div className="flex justify-end space-x-4 mb-8">
                    <a href="https://www.facebook.com/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Đăng nhập
                    </a>
                    <a href="#" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                        Đăng ký
                    </a>
                </div>

                <section className="max-w-2xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Tra cứu thông tin sao kê
                        </h2>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="accountNumber" className="block text-gray-700 mb-2">
                                    Số tài khoản
                                </label>
                                <input
                                    type="text"
                                    id="accountNumber"
                                    name="accountNumber"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="searchDate" className="block text-gray-700 mb-2">
                                    Thời gian
                                </label>
                                <input
                                    type="date"
                                    id="searchDate"
                                    name="searchDate"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Tra cứu
                            </button>
                        </form>
                    </div>
                </section>

                <section className="statement-section mt-8">
                    {/* Statement content will go here */}
                </section>
            </main>
        </div>
    );
}

export default App;