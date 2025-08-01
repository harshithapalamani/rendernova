"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { checkoutCredits } from "@/lib/actions/transaction.action";
import { toast } from "sonner";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      if (query.get("success")) {
        toast.success("Order placed!", {
          description: "You will receive an email confirmation",
          duration: 5000,
        });
      }

      if (query.get("canceled")) {
        toast.error("Order canceled!", {
          description: "Continue to shop around and checkout when you're ready",
          duration: 5000,
        });
      }
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onCheckout(); }}>
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;