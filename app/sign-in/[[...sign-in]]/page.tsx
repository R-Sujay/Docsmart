"use client";

import Background from "@/components/Background";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex w-full items-center min-h-screen px-4 sm:justify-center">
      <Background />

      <SignIn.Root>
        <SignIn.Step name="start" className="w-full bg-clip-padding backdrop-filter backdrop-blur-3xl space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8">
          <header className="text-center">
            <Image priority src="/logo.png" width={60} height={60} alt="logo" className="mx-auto" />

            <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">Sign in to Clover</h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-600" />
          <Clerk.Field name="identifier" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-zinc-950">Email</Clerk.Label>

            <Clerk.Input type="email" required className="w-full rounded-3xl bg-transparent border-4 px-3.5 py-3 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400" />
            <Clerk.FieldError className="block text-sm text-red-600" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm font-medium text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
          >
            Sign In
          </SignIn.Action>
          <div className="rounded-xl bg-neutral-100 p-5">
            <p className="mb-4 text-center text-sm/5 text-neutral-500">Alternatively, sign in with these platforms</p>
            <div className="space-y-2">
              <Clerk.Connection name="google" className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" aria-hidden className="size-4">
                  <g clipPath="url(#a)">
                    <path fill="currentColor" d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z" />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
                Login with Google
              </Clerk.Connection>
            </div>
          </div>
          <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <a href="#" className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100">
              Sign up
            </a>
          </p>
        </SignIn.Step>
        <SignIn.Step name="verifications" className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8">
          <SignIn.Strategy name="email_code">
            <header className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" className="mx-auto size-10">
                <mask id="a" width="40" height="40" x="0" y="0" maskUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                </mask>
                <g fill="#0A0A0A" mask="url(#a)">
                  <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 28a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 33a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 38a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                  <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM23 13.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM21.5 18.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM20.5 23.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM22.5 28.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 33.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM27 38.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                </g>
              </svg>
              <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">Verify email code</h1>
            </header>
            <Clerk.GlobalError className="block text-sm text-red-600" />
            <Clerk.Field name="code">
              <Clerk.Label className="sr-only">Email code</Clerk.Label>
              <Clerk.Input type="otp" required placeholder="Email code" className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400" />

              <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
            >
              Continue
            </SignIn.Action>
          </SignIn.Strategy>

          <p className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <a href="#" className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100">
              Sign up
            </a>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
