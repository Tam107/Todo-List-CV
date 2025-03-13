const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} TodoApp. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
