import * as React from "react";
import { PreviewFrame } from "@/components/preview-frame";
import { LoginForm } from "@/registry/new-york/components/login-form/login-form";
import { AvatarDropdown } from "@/registry/new-york/components/avatar-dropdown/avatar-dropdown";
import { FeedbackForm } from "@/registry/new-york/components/feedback-form/feedback-form";
import { InputSiblings } from "@/registry/new-york/components/input-siblings/input-siblings";
import { FieldPinInput } from "@/registry/new-york/components/field-pin-input/field-pin-input";
import { StatsCard } from "@/registry/new-york/components/stats-card/stats-card";
import { OrderTable } from "@/registry/new-york/components/order-table/order-table";
import { LoginDialog } from "@/registry/new-york/components/login-dialog/login-dialog";
import { OrderSummary } from "@/registry/new-york/components/order-summary/order-summary";
import { GridCard } from "@/registry/new-york/components/grid-card/grid-card";
import { BookingSummary } from "@/registry/new-york/components/booking-summary/booking-summary";
import { PaymentForm } from "@/registry/new-york/components/payment-form/payment-form";
import { PaymentForm2 } from "@/registry/new-york/components/payment-form2/payment-form2";
import {
  GridWidget,
  GridWidgetItem,
} from "@/registry/new-york/components/grid-widget/grid-widget";
import { ProductCard02 } from "@/registry/new-york/components/product-card-02/product-card-02";
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
        {/* Checkout Demo - GridWidget with OrderSummary and PaymentForm2 */}
        <PreviewFrame
          name="checkout-demo"
          title="Checkout Demo"
          registryType="component"
          fullWidth
          minHeight="800px"
        >
          <GridWidget columns="1/2" responsive="media">
            <GridWidgetItem ratio="normal">
              <OrderSummary />
            </GridWidgetItem>
            <GridWidgetItem ratio="wide">
              <PaymentForm2 />
            </GridWidgetItem>
          </GridWidget>
        </PreviewFrame>
        {/* Grid Widget Demo */}
        <PreviewFrame
          name="grid-widget"
          title="Grid Widget"
          registryType="component"
          fullWidth
        >
          <GridWidget>
            <GridWidgetItem ratio="full">
              <Card>
                <CardContent>
                  <Typography variant="h6">Full Width</Typography>
                  <Typography variant="body2" color="text.secondary">
                    This spans the full width of the grid
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
            <GridWidgetItem ratio="wide">
              <Card>
                <CardContent>
                  <Typography variant="h6">Wide</Typography>
                  <Typography variant="body2" color="text.secondary">
                    This spans 7 columns on md+ screens
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
            <GridWidgetItem ratio="normal">
              <Card>
                <CardContent>
                  <Typography variant="h6">Normal</Typography>
                  <Typography variant="body2" color="text.secondary">
                    This spans 5 columns on md+ screens
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
            <GridWidgetItem ratio="narrow">
              <Card>
                <CardContent>
                  <Typography variant="h6">Narrow (2 rows)</Typography>
                  <Typography variant="body2" color="text.secondary">
                    This spans 5 columns and 2 rows on md+ screens
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
            <GridWidgetItem ratio="wide">
              <Card>
                <CardContent>
                  <Typography variant="h6">Wide</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Another wide card with 7 columns
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
            <GridWidgetItem ratio="wide">
              <Card>
                <CardContent>
                  <Typography variant="h6">Normal</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Another normal card
                  </Typography>
                </CardContent>
              </Card>
            </GridWidgetItem>
          </GridWidget>
        </PreviewFrame>
        {/* Booking Summary */}
        <PreviewFrame
          name="booking-summary"
          title="Booking Summary"
          registryType="component"
        >
          <BookingSummary />
        </PreviewFrame>
        {/* Order Summary */}
        <PreviewFrame
          name="order-summary"
          title="Order Summary"
          registryType="component"
        >
          <OrderSummary />
        </PreviewFrame>
        {/* GridCard Demo */}
        <PreviewFrame
          name="grid-card"
          title="Grid Card Demo"
          fullWidth
          showOpenInV0={false}
          registryType="component"
        >
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
        </PreviewFrame>

        {/* Product Card 02 */}
        <PreviewFrame
          name="product-card-02"
          title="Product Card 02"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[450px] relative">
            <ProductCard02 />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="dashboard-layout"
          title="Dashboard Layout"
          href="/dashboard-layout"
          minHeight="450px"
          registryType="block"
        />

        <PreviewFrame
          name="dashboard-layout-02"
          title="Dashboard Layout 02"
          href="/dashboard-layout-02"
          minHeight="450px"
          registryType="block"
        />

        <PreviewFrame
          name="dashboard-layout-03"
          title="Dashboard Layout 03"
          href="/dashboard-layout-03"
          minHeight="450px"
          registryType="block"
        />

        <PreviewFrame
          name="dashboard-layout-04"
          title="Dashboard Layout 04"
          href="/dashboard-layout-04"
          minHeight="450px"
          registryType="block"
        />

        <PreviewFrame
          name="payment-form"
          title="Payment Form"
          minHeight="700px"
          registryType="component"
        >
          <PaymentForm />
        </PreviewFrame>

        <PreviewFrame
          name="payment-form2"
          title="Payment Form 2"
          minHeight="700px"
          registryType="component"
        >
          <PaymentForm2 />
        </PreviewFrame>

        <PreviewFrame
          name="avatar-dropdown"
          title="Avatar Dropdown"
          minHeight="120px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[80px] relative">
            <AvatarDropdown />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="login-form"
          title="A simple login form"
          minHeight="450px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[400px] relative">
            <LoginForm />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="login-dialog"
          title="Login Dialog"
          minHeight="120px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[80px] relative">
            <LoginDialog />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="feedback-form"
          title="A contact form with Zod validation."
          minHeight="450px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[500px] relative">
            <FeedbackForm />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="stats-card"
          title="Stats Card"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[120px] relative gap-4">
            <StatsCard label="Revenue" value="12,345" positive />
            <StatsCard label="Churn" value="-234.2" positive={false} />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="order-table"
          title="Order Table"
          minHeight="450px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[400px] relative w-full">
            <OrderTable />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="field-pin-input"
          title="Field Pin Input"
          minHeight="450px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[400px] relative">
            <FieldPinInput />
          </div>
        </PreviewFrame>

        <PreviewFrame
          name="input-siblings"
          title="Input Siblings"
          minHeight="450px"
          registryType="component"
        >
          <div className="flex items-center justify-center min-h-[400px] relative">
            <InputSiblings />
          </div>
        </PreviewFrame>
      </main>
    </div>
  );
}
