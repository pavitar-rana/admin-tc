import { SignUpForm } from "@/components/SIgnUp";
import { Layout } from "@/components/layout";
import * as React from "react";

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
}
