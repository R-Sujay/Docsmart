"use client";

import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { createStripePortal } from "@/actions/createStripePortal";
import Background from "@/components/Background";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import getStripe from "@/lib/stripe-js";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type UserDetails = {
  email: string;
  name: string;
};

function PricingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    };

    startTransition(async () => {
      const stripe = await getStripe();

      if (hasActiveMembership) {
        const stripePortalUrl = await createStripePortal();
        return router.push(stripePortalUrl);
      }

      const sessionId = await createCheckoutSession(userDetails);

      await stripe?.redirectToCheckout({ sessionId });
    });
  };

  return (
    <div>
      <Background />

      <div className="py-10 sm:py-5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">Supercharge your Document Campanion</p>
        </div>

        <p
          className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg
leading-8 text-[#c7c3be]"
        >
          Choose an affordable plan thats packed with the best features for interacting with your PDFs, enhancing productivity, and streamlining your workflow.
        </p>

        <div className="max-w-md mx-auto mt-10 grid-cols-1 grid md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
          <div className="ring-1 ring-[#1c2541] glass p-8 h-full pb-12 rounded-3xl">
            <h3 className="text-3xl font-semibold leading-8 text-white">Starter Plan</h3>
            <p className="mt-2 text-sm leading-6 text-[#c7c3be]">Explore Core Features at No Cost</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-indigo-200">Free</span>
            </p>

            <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-[#c7c3be]">
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />2 Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Up to 3 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Try out the AI Chat Functionality
              </li>
            </ul>
          </div>

          <div className="ring-2 ring-indigo-600 glass rounded-3xl p-8">
            <h3 className="text-3xl font-semibold leading-8 text-white">Pro Plan</h3>
            <p className="mt-2 text-sm leading-6 text-[#c7c3be]">Maximize Productivity with PRO Features</p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-[#c7c3be]">$5.99</span>
              <span className="text-sm font-semibold leading-6 text-[#c7c3be]">/ month</span>
            </p>

            <Button
              className="bg-indigo-600 w-full text-white shadow-sm
hover:bg-indigo-500 mt-6 block rounded-md px-3 py-2
text-center text-sm font-semibold leading-6
focus-visible:outline focus-visible:outline-2
focus-visible:outline-offset-2
focus-visible:outline-indigo-600"
              disabled={loading || isPending}
              onClick={handleUpgrade}
            >
              {isPending || loading ? "Loading..." : hasActiveMembership ? "Manage Plan" : "Upgrade to Pro"}
            </Button>

            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-[#c7c3be]">
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Store upto 20 Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Ability to Delete Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Up to 100 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Full Power AI Chat Functionality with Memory Recall
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                24-hour support response time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
