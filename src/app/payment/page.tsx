import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./components/Checkout";
export default function Payment() {
  const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
  currency: "USD",
  intent: "capture",
};
    return (
       <PayPalScriptProvider options={initialOptions}>
        <Checkout/>
</PayPalScriptProvider>

    );
}