import { Resume } from "@/components/Cart/StepOne/resume";
import Payment from "@/components/Cart/StepTwo/payment";
import { useSearchParams } from "next/navigation";

const Cart = () => {
    const searchParams = useSearchParams()
    const step = searchParams.get("step") || "1";

  
    return (
        <>
            {step === "1" && <Resume />}
            {step === "2" && <Payment />}
        </>
    );
};

export default Cart;
