import * as React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">MUI Registry</h1>
        <p className="text-muted-foreground">
          A registry for distributing MUI code.
        </p>
      </header>
    </div>
  );
}
