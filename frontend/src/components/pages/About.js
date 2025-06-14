import React from "react";

const teamMembers = [
    { stt: 1, name: "Đặng Nguyên Bảo", mssv: 2310211, email: "bao.dangnguyen@hcmut.edu.vn", github: "bibimoni", role: "backend" },
    { stt: 2, name: "Bùi Trần Duy Khang", mssv: 2311402, email: "khang.buitranduycse@hcmut.edu.vn", github: "khangbkk23", role: "frontend" },
    { stt: 3, name: "Nguyễn Tuấn Cường", mssv: 2110882, email: "cuong.nguyenmsmsms23@hcmut.edu.vn", github: "cuongnguyen232", role: "backend" },
    { stt: 4, name: "Trần Đức Tiến", mssv: 2014732, email: "tien.tran0709@hcmut.edu.vn", github: "tient2002vn", role: "frontend" },
    { stt: 5, name: "Đào Hữu Gia Huy", mssv: 2211158, email: "huy.daoitman@hcmut.edu.vn", github: "huydao-411", role: "frontend" },
    { stt: 6, name: "Nguyễn Như Xuân", mssv: 1832063, email: "xuan.nguyennnhu@hcmut.edu.vn", github: "nnxuan", role: "slide" },
    { stt: 7, name: "Nguyễn Ngô Hoàng Long", mssv: 2011553, email: "long.nguyen1142002@hcmut.edu.vn", github: "", role: "slide/ báo cáo" },
];

export default function About() {
    return (
        <div className="min-h-screen py-6 font-sans">
            <div className="min-w-[1100px] max-w-[1400px] mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Về chúng tôi</h1>
                <p className="text-center text-gray-600 mb-8">
                    Đây là thông tin về các thành viên trong nhóm Bài tập lớn môn Lập trình nâng cao.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full bg-blue-100 border-collapse border border-gray-300 table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800">
                                <th className="border border-gray-300 px-2 py-4">STT</th>
                                <th className="border border-gray-300 px-2 py-4 min-w-[200px] max-w-[1000px] whitespace-nowrap">Họ và Tên</th>
                                <th className="border border-gray-300 px-8 py-4 max-w-[200px] whitespace-normal">MSSV</th>
                                <th className="border border-gray-300 px-8 py-4">Email</th>
                                <th className="border border-gray-300 px-8 py-4">Github Account</th>
                                <th className="border border-gray-300 px-8 py-4">Phụ trách</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map((member, index) => (
                                <tr key={member.stt} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                    <td className="border border-gray-300 px-2 py-4 text-center">{member.stt}</td>
                                    <td className="border border-gray-300 px-2 py-4">{member.name}</td>
                                    <td className="border border-gray-300 px-8 py-4 text-center">{member.mssv}</td>
                                    <td className="border border-gray-300 px-4 py-4">
                                        {member.email ? (
                                            <a href={`mailto:${member.email}`} className="text-blue-500 hover:underline">
                                                {member.email}
                                            </a>
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {member.github ? (
                                            <a
                                                href={`https://github.com/${member.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {member.github}
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4 text-center">{member.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
