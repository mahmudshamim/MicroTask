import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images
import heroSecure from '../../assets/images/hero_secure.png';
import heroPayments from '../../assets/images/hero_payments.png';
import heroWorkers from '../../assets/images/hero_workers.png';

const Hero = () => {
    const slides = [
        {
            id: 1,
            title: "Secure & Trusted Platform",
            heading: "Micro Tasking and Earning Platform",
            description: "Join the world's most trusted platform for small tasks. Earn money by completing simple jobs from anywhere in the world.",
            buttonText: "Start Earning",
            buttonLink: "/register",
            badge: "100% Secure",
            image: heroSecure
        },
        {
            id: 2,
            title: "Reliable & Fast Payments",
            heading: "Fast Withdrawals & Secure Transactions",
            description: "Get paid instantly for your hard work. Our platform ensures secure payments and fast withdrawal processing for all workers.",
            buttonText: "Explore Jobs",
            buttonLink: "/register",
            badge: "Fast Payments",
            image: heroPayments
        },
        {
            id: 3,
            title: "Connect with Top Workers",
            heading: "High Quality Work Guaranteed",
            description: "Post tasks and get them completed by the best micro-workers. Scalable and efficient solutions for all your needs.",
            buttonText: "Join as Buyer",
            buttonLink: "/register",
            badge: "Top Workers",
            image: heroWorkers
        }
    ];

    return (
        <div className='relative bg-[#0a1122] text-white min-h-[700px] flex flex-col justify-center overflow-hidden'>
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full"
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        {({ isActive }) => (
                            <div className="relative pt-20 pb-32">
                                {/* Grid Background */}
                                <div className="absolute inset-0 z-0 opacity-[0.3]"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
                                            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
                                        `,
                                        backgroundSize: '60px 60px'
                                    }}>
                                </div>

                                <div className='container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10'>
                                    {/* Left Content */}
                                    <div className={`flex-1 space-y-8 transition-all duration-1000 transform ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 text-emerald-500/80 text-xs font-bold border border-emerald-500/10 backdrop-blur-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            {slide.badge}
                                        </div>

                                        <div>
                                            <h2 className="text-emerald-500 text-xl font-bold mb-4">{slide.title}</h2>
                                            <h1 className='text-5xl md:text-6xl font-black leading-tight tracking-tight text-white mb-6'>
                                                {slide.heading.split(' ').slice(0, 2).join(' ')} <br />
                                                {slide.heading.split(' ').slice(2).join(' ')}
                                            </h1>

                                            <p className='text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium mb-10'>
                                                {slide.description}
                                            </p>

                                            <div className='flex flex-wrap items-center gap-5'>
                                                <Link to={slide.buttonLink} className='px-10 py-4 bg-primary hover:bg-emerald-500 text-white font-black rounded-xl transition-all flex items-center gap-2 shadow-xl shadow-primary/20'>
                                                    {slide.buttonText}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                                <Link to="/login" className='px-10 py-4 border border-emerald-500/30 text-white font-bold rounded-xl hover:bg-emerald-500/5 transition-all'>
                                                    Sign In
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-12 pt-10 border-t border-white/5">
                                            <div>
                                                <h3 className="text-3xl font-black text-white">50K+</h3>
                                                <p className="text-slate-500 text-xs font-bold mt-1">Active Workers</p>
                                            </div>
                                            <div className="border-l border-white/5 pl-12">
                                                <h3 className="text-3xl font-black text-white">1M+</h3>
                                                <p className="text-slate-500 text-xs font-bold mt-1">Tasks Completed</p>
                                            </div>
                                            <div className="border-l border-white/5 pl-12">
                                                <h3 className="text-3xl font-black text-white">$2M+</h3>
                                                <p className="text-slate-500 text-xs font-bold mt-1">Paid Out</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Illustration */}
                                    <div className={`flex-1 relative lg:block hidden transition-all duration-1000 delay-300 transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                        <div className="relative z-10 transform perspective-1000 rotate-y-3">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full max-w-lg mx-auto rounded-[2.5rem] shadow-2xl border border-white/10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Curve/Wave Decoration */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 pointer-events-none z-20">
                <svg className="relative block w-[200%] h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.44,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,2,1200,34.19V0Z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;
