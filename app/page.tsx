"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "login", label: "Login", active: true },
  { id: "signup", label: "Sign up", active: false },
  { id: "profile", label: "Profile", active: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">MUI+</h1>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Tabs defaultValue="authentication" className="w-auto">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="theme"
                  className="bg-transparent data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md px-3 py-1.5"
                >
                  Theme
                </TabsTrigger>
                <TabsTrigger 
                  value="authentication"
                  className="bg-transparent data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md px-3 py-1.5"
                >
                  Authentication
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard"
                  className="bg-transparent data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md px-3 py-1.5"
                >
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-48 min-h-[calc(100vh-73px)] border-r bg-background p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  item.active 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Card Section */}
          <section className="mb-8">
            <h2 className="text-sm font-medium mb-4 text-muted-foreground">card</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-48">
                  <CardContent className="flex items-center justify-center h-full">
                    <div className="text-muted-foreground text-sm">Card {i}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Full Page Section */}
          <section>
            <h2 className="text-sm font-medium mb-4 text-muted-foreground">Full page</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="h-64 lg:col-span-2">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-muted-foreground text-sm">Large Content Area</div>
                </CardContent>
              </Card>
              <Card className="h-64">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-muted-foreground text-sm">Side Content</div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
