import React from 'react'

function Footer() {
    return (
        <React.Fragment>
            <footer className="bg-gray-900 text-white py-4">
                <div className="container mx-auto text-center">
                    <ul className="inline-block">
                        <li className="inline-block mr-6"><a href="#" className="text-gray-300 hover:text-gray-200">Privacy Policy</a></li>
                        <li className="inline-block mr-6"><a href="#" className="text-gray-300 hover:text-gray-200">Terms of Service</a></li>
                        <li className="inline-block"><a href="#" className="text-gray-300 hover:text-gray-200">Contact Us</a></li>
                    </ul>
                    <p className="mt-2">&copy; {new Date().getFullYear()} Virtual Healthcare</p>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer