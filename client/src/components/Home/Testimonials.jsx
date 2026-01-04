import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Alice Johnson", image: "https://i.pravatar.cc/150?img=1", quote: "This platform changed my life! I earn extra money in my free time." },
        { id: 2, name: "David Smith", image: "https://i.pravatar.cc/150?img=12", quote: "As a buyer, I get my tasks done super fast. Highly recommended!" },
        { id: 3, name: "Emma Wilson", image: "https://i.pravatar.cc/150?img=5", quote: "Great support and easy withdrawal process. Love it." },
        { id: 4, name: "Michael Brown", image: "https://i.pravatar.cc/150?img=3", quote: "The best micro-tasking site I have found so far." },
        { id: 5, name: "Sarah Lee", image: "https://i.pravatar.cc/150?img=9", quote: "Simple interface and reliable payments. Couldn't ask for more!" },
        { id: 6, name: "Robert Taylor", image: "https://i.pravatar.cc/150?img=13", quote: "I've completed over 200 tasks. The quality of buyers is excellent." },
        { id: 7, name: "Jessica Martinez", image: "https://i.pravatar.cc/150?img=10", quote: "Perfect for students like me. I work on my own schedule." },
        { id: 8, name: "Chris Anderson", image: "https://i.pravatar.cc/150?img=14", quote: "Fast approval process and instant notifications. Very efficient!" },
    ]

    return (
        <div className="py-24 bg-white relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-block px-6 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-black mb-6 border border-emerald-100 uppercase tracking-[0.2em]">
                        ✨ Testimonials
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight px-4">What Our Users Say</h2>
                    <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">Don't just take our word for it. Here is what our community has to say.</p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="testimonials-swiper pb-12"
                >
                    {reviews.map(review => (
                        <SwiperSlide key={review.id} className="h-auto">
                            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 relative h-full flex flex-col hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-500 group">
                                <div className="absolute top-10 right-10 text-emerald-600/10 group-hover:text-emerald-600/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex items-center gap-5 mb-8">
                                    <img src={review.image} alt={review.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-slate-50 shadow-xl shadow-slate-200" />
                                    <div>
                                        <h3 className="font-black text-xl text-slate-900 mb-1">{review.name}</h3>
                                        <div className="flex text-emerald-500 text-sm gap-0.5">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-lg leading-relaxed italic flex-grow font-medium">"{review.quote}"</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
