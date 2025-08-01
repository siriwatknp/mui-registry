import * as React from "react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { LoginForm } from "@/registry/new-york/blocks/login-form/login-form";
import { AvatarDropdown } from "@/registry/new-york/blocks/avatar-dropdown/avatar-dropdown";
import { FeedbackForm } from "@/registry/new-york/blocks/feedback-form/feedback-form";
import { InputSiblings } from "@/registry/new-york/blocks/input-siblings/input-siblings";
import { FieldPinInput } from "@/registry/new-york/blocks/field-pin-input/field-pin-input";
import { StatsCard } from "@/registry/new-york/blocks/stats-card/stats-card";
import { OrderTable } from "@/registry/new-york/blocks/order-table/order-table";
import { LoginDialog } from "@/registry/new-york/blocks/login-dialog/login-dialog";
import Link from "next/link";
import { GridCard } from "@/registry/new-york/blocks/grid-card/grid-card";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">MUI Registry</h1>
        <p className="text-muted-foreground">
          A registry for distributing MUI code.
        </p>
      </header>
      <main className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,600px),1fr))] gap-4">
        {/* GridCard Demo */}
        <div
          data-preview="grid-card"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[200px] relative xl:[grid-column:1/3]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Grid Card Demo
            </h2>
          </div>
          <GridCard idealWidth={320}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} variant="outlined">
                <CardContent>
                  <Typography variant="h6">Card {i + 1}</Typography>
                  <Typography color="text.secondary">
                    This is card number {i + 1}.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </GridCard>
        </div>

        <div
          data-preview="dashboard-layout"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard-layout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground sm:pl-3 hover:underline focus:underline"
            >
              Dashboard Layout
            </Link>
            <OpenInV0Button name="dashboard-layout" className="w-fit" />
          </div>
          <iframe
            src="/dashboard-layout"
            className="flex flex-1 items-center justify-center min-h-[400px] relative"
            style={{ width: "100%", border: "none" }}
          />
        </div>

        <div
          data-preview="dashboard-layout-02"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard-layout-02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground sm:pl-3 hover:underline focus:underline"
            >
              Dashboard Layout 02
            </Link>
            <OpenInV0Button name="dashboard-layout-02" className="w-fit" />
          </div>
          <iframe
            src="/dashboard-layout-02"
            className="flex flex-1 items-center justify-center min-h-[400px] relative"
            style={{ width: "100%", border: "none" }}
          />
        </div>

        <div
          data-preview="dashboard-layout-03"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard-layout-03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground sm:pl-3 hover:underline focus:underline"
            >
              Dashboard Layout 03
            </Link>
            <OpenInV0Button name="dashboard-layout-03" className="w-fit" />
          </div>
          <iframe
            src="/dashboard-layout-03"
            className="flex flex-1 items-center justify-center min-h-[400px] relative"
            style={{ width: "100%", border: "none" }}
          />
        </div>

        <div
          data-preview="dashboard-layout-04"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard-layout-04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground sm:pl-3 hover:underline focus:underline"
            >
              Dashboard Layout 04
            </Link>
            <OpenInV0Button name="dashboard-layout-04" className="w-fit" />
          </div>
          <iframe
            src="/dashboard-layout-04"
            className="flex flex-1 items-center justify-center min-h-[400px] relative"
            style={{ width: "100%", border: "none" }}
          />
        </div>

        <div
          data-preview="avatar-dropdown"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[120px] relative"
        >
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

        <div
          data-preview="login-form"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
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

        <div
          data-preview="login-dialog"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[120px] relative"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Login Dialog
            </h2>
            <OpenInV0Button name="login-dialog" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[80px] relative">
            <LoginDialog />
          </div>
        </div>

        <div
          data-preview="feedback-form"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
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

        <div
          data-preview="stats-card"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[200px] relative"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Stats Card
            </h2>
            <OpenInV0Button name="stats-card" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[120px] relative gap-4">
            <StatsCard label="Revenue" value="12,345" positive />
            <StatsCard label="Churn" value="-234.2" positive={false} />
          </div>
        </div>

        <div
          data-preview="order-table"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Order Table
            </h2>
            <OpenInV0Button name="order-table" className="w-fit" />
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative w-full">
            <OrderTable />
          </div>
        </div>

        <div
          data-preview="field-pin-input"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
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

        <div
          data-preview="input-siblings"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
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

        <div
          data-preview="theme-minimal"
          className="flex flex-col gap-4 border rounded-lg p-4 min-h-[450px] relative"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/theme-minimal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground sm:pl-3 hover:underline focus:underline"
            >
              Minimal Theme Preview
            </Link>
          </div>
          <iframe
            src="/theme-minimal"
            className="flex flex-1 items-center justify-center min-h-[400px] relative"
            style={{ width: "100%", border: "none" }}
          />
        </div>
      </main>
    </div>
  );
}
