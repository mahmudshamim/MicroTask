import { FaFacebook, FaGithub, FaLinkedin, FaClipboardCheck } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#020617] text-gray-400 py-20 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-16">
                    <div className="md:w-1/3">
                        <div className="flex items-center gap-3 text-3xl font-black text-white mb-8 tracking-tight">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                                <FaClipboardCheck className="text-xl" />
                            </div>
                            MicroTask
                        </div>
                        <p className="mb-8 leading-relaxed text-lg">
                            The world's leading micro-tasking platform.
                            Built for professionals, by professionals.
                        </p>
                        <div className="flex gap-6 text-2xl">
                            <a href="https://github.com/mahmudshamim" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110"><FaGithub /></a>
                            <a href="https://linkedin.com/in/mahmud-bhk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110"><FaLinkedin /></a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all hover:scale-110"><FaFacebook /></a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:w-2/3">
                        <div>
                            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-[0.2em]">Platform</h4>
                            <ul className="space-y-4 font-medium">
                                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Browse Tasks</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Support Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-[0.2em]">Company</h4>
                            <ul className="space-y-4 font-medium">
                                <li><a href="#" className="hover:text-primary transition-colors">About Story</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Global News</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black mb-8 text-sm uppercase tracking-[0.2em]">Legal</h4>
                            <ul className="space-y-4 font-medium">
                                <li><a href="#" className="hover:text-primary transition-colors">Terms of Use</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Privacy Hub</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-gray-600">
                    <p>&copy; {new Date().getFullYear()} MicroTask Platform. Crafted with ❤️ for workers.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
