// src/app/dashboard/settings/page.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
        <p className="text-muted-foreground">
          Please sign in to access your account settings.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      {/* User Account */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* User avatar */}
            <UserButton afterSignOutUrl="/" />
            <div>
              <CardTitle className="text-lg sm:text-xl font-semibold">
                {user.fullName || "Unnamed User"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </CardHeader>
      </Card>

      {/* Payment Methods */}
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold text-center sm:text-left">
            💳 Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 sm:p-6 text-center sm:text-left space-y-4">
            <p className="text-base font-medium text-foreground">
              Payment integration is <span className="font-bold">Coming Soon</span>.
            </p>
            <p className="text-sm text-muted-foreground">
              Future supported methods will include:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-1">
              <li>PayPal</li>
              <li>Wise</li>
              <li>Stripe</li>
              <li>Direct Bank Transfer</li>
              <li>Venmo</li>
              <li>Cash App</li>
              <li>Payoneer</li>
              <li>Bitcoin (Crypto)</li>
              <li>Ethereum (Crypto)</li>
              <li>USDT (Tether - Crypto)</li>
              <li>Other regional and upcoming payment options</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Footer / Branding */}
      <div className="text-center text-xs text-muted-foreground mt-6">
        © {new Date().getFullYear()} Freelancer Invoice Generator — All rights reserved.
      </div>
    </div>
  );
}
