import React from 'react'

const EmailBox = () => {
    return (
        <div>
            <section className="relative bg-gradient-to-r from-green-700 to-green-500 text-white py-16">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
                    <p className="text-xl mb-8 text-green-100">
                        Join thousands of students and advance your career today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 
                           bg-white
                           px-6 py-3 
                           rounded-lg 
                           text-gray-900 
                           focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EmailBox