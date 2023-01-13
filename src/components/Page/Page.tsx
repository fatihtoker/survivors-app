import * as React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen container mx-auto px-16 py-4">{children}</div>
  );
}
