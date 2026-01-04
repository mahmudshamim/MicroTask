import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Withdrawals = () => {
    const { user } = useAuth();
    const { userData } = useUser();
    const axiosPublic = useAxiosPublic();
    const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [paymentSystem, setPaymentSystem] = useState("Stripe");
    const [accountNumber, setAccountNumber] = useState("");

    const currentCoins = userData?.coins || 0;
    const totalWithdrawAmount = currentCoins / 20; // 20 coins = $1

    useEffect(() => {
        // Calculate withdrawal amount when coins change
        const amount = coinsToWithdraw / 20;
        setWithdrawAmount(amount);
    }, [coinsToWithdraw]);

    const handleWithdraw = (e) => {
        e.preventDefault();

        if (coinsToWithdraw < 200) {
            Swal.fire({
                icon: 'error',
                title: 'Minimum Withdrawal',
                text: 'You need at least 200 coins (equivalent to $10) to withdraw.'
            });
            return;
        }

        if (coinsToWithdraw > currentCoins) {
            Swal.fire({
                icon: 'error',
                title: 'Insufficient Coins',
                text: 'You do not have enough coins for this withdrawal.'
            });
            return;
        }

        if (!accountNumber.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Account Number Required',
                text: 'Please enter your account number.'
            });
            return;
        }

        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: coinsToWithdraw,
            withdrawal_amount: withdrawAmount,
            payment_system: paymentSystem,
            account_number: accountNumber,
            withdraw_date: new Date(),
            status: 'pending'
        };

        axiosPublic.post('/withdrawals', withdrawalData)
            .then(res => {
                if (res.data._id) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Withdrawal Request Submitted',
                        text: 'Your withdrawal request has been submitted and is pending admin approval.'
                    });
                    setCoinsToWithdraw(0);
                    setWithdrawAmount(0);
                    setAccountNumber("");
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response?.data?.message || 'Failed to submit withdrawal request.'
                });
            });
    };

    const canWithdraw = currentCoins >= 200;

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Withdraw Earnings</h2>
            <div className="card w-full bg-[#1e293b]/50 backdrop-blur-xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
                <div className="card-body p-10">
                    <div className="stat text-center p-0 mb-8">
                        <div className="stat-title text-gray-400 font-bold uppercase tracking-widest text-xs">Current Earnings</div>
                        <div className="stat-value text-emerald-400 font-black text-5xl mt-2">${totalWithdrawAmount.toFixed(2)}</div>
                        <div className="stat-desc text-gray-500 mt-2">Available Coins: <span className="text-gray-300 font-bold">{currentCoins}</span></div>
                    </div>

                    {!canWithdraw && (
                        <div className="alert alert-warning/10 border border-warning/20 text-warning text-sm font-bold mb-6 rounded-2xl">
                            <span className="flex items-center gap-2">⚠️ Minimum 200 coins required to withdraw ($10).</span>
                        </div>
                    )}

                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Coins to Withdraw</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Min 200 coins"
                                className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent h-12"
                                min="200"
                                max={currentCoins}
                                value={coinsToWithdraw || ""}
                                onChange={(e) => setCoinsToWithdraw(parseInt(e.target.value) || 0)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Withdraw Amount ($)</span>
                            </label>
                            <input
                                type="text"
                                value={`$${withdrawAmount.toFixed(2)}`}
                                disabled
                                className="input input-bordered bg-white/10 border-white/5 text-emerald-400 font-bold h-12 disabled:bg-white/5 disabled:border-white/10"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Payment Method</span>
                            </label>
                            <select
                                className="select select-bordered bg-white/5 border-white/10 text-white focus:border-accent h-12"
                                value={paymentSystem}
                                onChange={(e) => setPaymentSystem(e.target.value)}
                                required
                            >
                                <option value="Stripe">Stripe Payment</option>
                                <option value="Bkash">Bkash (Mobile)</option>
                                <option value="Rocket">Rocket (Mobile)</option>
                                <option value="Nagad">Nagad (Mobile)</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-gray-400 font-bold">Account Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your account details"
                                className="input input-bordered bg-white/5 border-white/10 text-white focus:border-accent h-12"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                        </div>

                        {canWithdraw ? (
                            <button type="submit" className="btn btn-primary w-full h-14 rounded-xl text-lg font-black mt-4">Submit Withdrawal Request</button>
                        ) : (
                            <button type="button" className="btn btn-primary w-full h-14 rounded-xl text-lg font-black mt-4 opacity-50 transition-none" disabled>Insufficient Coins</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Withdrawals;
