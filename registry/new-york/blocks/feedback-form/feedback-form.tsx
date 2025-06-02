"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { z } from "zod";

const feedbackFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  feedback: z.string().min(1, "Feedback is required"),
});

export function FeedbackForm() {
  const [pending, setPending] = React.useState(false);
  const [state, setState] = React.useState({
    defaultValues: {
      name: "",
      email: "",
      feedback: "",
    },
    errors: {
      name: "",
      email: "",
      feedback: "",
    },
  });

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPending(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      const result = feedbackFormSchema.safeParse(data);
      if (!result.success) {
        setState((prev) => ({
          ...prev,
          errors: Object.fromEntries(
            Object.entries(result.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value?.[0] ?? ""]
            )
          ) as Record<keyof typeof state.errors, string>,
        }));
        setPending(false);
        return;
      }
      setPending(false);
      // Optionally handle successful feedback submission here
    },
    []
  );

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
      <Card variant="outlined">
        <CardHeader
          title="We value your feedback!"
          subheader="Let us know how we can improve."
        />
        <Divider />
        <CardContent
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <TextField
            id="name"
            name="name"
            label="Name"
            placeholder="Your name"
            disabled={pending}
            error={!!state.errors.name}
            helperText={state.errors.name}
            defaultValue={state.defaultValues.name}
            required
            size="small"
            fullWidth
            margin="dense"
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
            disabled={pending}
            error={!!state.errors.email}
            helperText={state.errors.email}
            defaultValue={state.defaultValues.email}
            required
            size="small"
            fullWidth
            margin="dense"
            type="email"
          />
          <TextField
            id="feedback"
            name="feedback"
            label="Feedback"
            placeholder="Type your feedback here..."
            disabled={pending}
            error={!!state.errors.feedback}
            helperText={state.errors.feedback}
            defaultValue={state.defaultValues.feedback}
            required
            size="small"
            fullWidth
            margin="dense"
            multiline
            minRows={3}
          />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            size="small"
            disabled={pending}
            variant="contained"
            color="primary"
          >
            {pending ? "Sending..." : "Send Feedback"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
