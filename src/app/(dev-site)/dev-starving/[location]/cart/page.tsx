import RoundButton from "@/app/components/dev-starving/RoundButton";
import Link from "next/link";

export default function CartPage() {
  // Placeholder cart items
  const cartItems = [
    {
      id: 1,
      title: "Electric Guitar",
      price: "$999.99",
      quantity: 1,
    },
    {
      id: 2,
      title: "Instrument Cable",
      price: "$19.99",
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium">{item.price}</p>
            </div>
          ))}

          <div className="flex justify-between text-xl font-semibold mt-6">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="text-right">
            <RoundButton
              href={"/checkout"}
              className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </RoundButton>
          </div>
        </div>
      )}
    </main>
  );
}
