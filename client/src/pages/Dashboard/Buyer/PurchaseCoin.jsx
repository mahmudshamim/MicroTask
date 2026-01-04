import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

// TODO: Move key to .env
const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK || "pk_test_51O...");

const PurchaseCoin = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const packages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Purchase Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {packages.map((pkg, idx) => (
                    <div key={idx}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`card bg-[#1e293b]/50 backdrop-blur-xl cursor-pointer border-2 transition-all rounded-[2rem] ${selectedPackage === pkg ? 'border-accent shadow-accent/20' : 'border-white/5'}`}>
                        <div className="card-body items-center text-center">
                            <h2 className="text-2xl font-bold text-white">{pkg.coins} Coins</h2>
                            <p className="text-xl text-accent font-black">${pkg.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <div className="w-full max-w-md mx-auto bg-base-300 p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6 text-white">Pay <span className="text-accent">${selectedPackage.price}</span> for {selectedPackage.coins} Coins</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={selectedPackage.price} coins={selectedPackage.coins} />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default PurchaseCoin;
