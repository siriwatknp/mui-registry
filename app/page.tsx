import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { LoginForm } from "@/registry/new-york/blocks/login-form/login-form";
import { AvatarDropdown } from "@/registry/new-york/blocks/avatar-dropdown/avatar-dropdown";
import { FeedbackForm } from "@/registry/new-york/blocks/feedback-form/feedback-form";
import { InputSiblings } from "@/registry/new-york/blocks/input-siblings/input-siblings";
import { FieldPinInput } from "@/registry/new-york/blocks/field-pin-input/field-pin-input";
import { DashboardLayout } from "@/registry/new-york/blocks/dashboard-layout/dashboard-layout";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,600px),1fr))] gap-4">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Dashboard Layout
            </h2>
            <OpenInV0Button name="dashboard-layout" className="w-fit" />
          </div>
          <iframe
            src="/dashboard-layout"
            className="flex items-center justify-center min-h-[400px] relative"
          >
            <DashboardLayout />
          </iframe>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Field Pin Input
            </h2>
            <OpenInV0Button name="field-pin-input" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <FieldPinInput />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Input Siblings
            </h2>
            <OpenInV0Button name="input-siblings" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <InputSiblings />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[120px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Avatar Dropdown
            </h2>
            <OpenInV0Button name="avatar-dropdown" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[80px] relative">
            <AvatarDropdown />
          </div>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple login form
            </h2>
            <OpenInV0Button name="login-form" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <LoginForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A contact form with Zod validation.
            </h2>
            <OpenInV0Button name="feedback-form" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[500px] relative">
            <FeedbackForm />
          </div>
        </div>
      </main>
    </div>
  );
}
