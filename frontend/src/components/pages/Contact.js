import React from 'react'

const Contact = () => {
  return (
    <div className='min-h-screen p-8 '>
      <div className='bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto'>
        <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>
          Liên hệ với chúng tôi
        </h1>
        <p className='text-center text-gray-700 mb-8'>
          Bạn có câu hỏi hoặc muốn biết thêm thông tin về dự án? Hãy liên hệ với
          chúng tôi qua các phương thức dưới đây.
        </p>
        <h2 className='text-2xl font-semibold text-blue-500 mb-4'>
          Thông tin liên hệ
        </h2>
        <div className='mb-4'>
          <p className='text-lg font-semibold'>Email: </p>
          <a
            href='mailto:bao.dangnguyen@hcmut.edu.vn'
            className='text-blue-500 hover:underline'
          >
            bao.dangnguyen@hcmut.edu.vn
          </a>
        </div>
        <div className='mb-4'>
          <p className='text-lg font-semibold'>Số điện thoại: </p>
          <a
            href='https://zalo.me/0905191826'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            0905.191.826
          </a>
        </div>

        <div className='mb-4'>
          <p className='text-lg font-semibold'>GitHub: </p>
          <a
            href='https://github.com/bibimoni'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-500 hover:underline'
          >
            bibimoni
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
