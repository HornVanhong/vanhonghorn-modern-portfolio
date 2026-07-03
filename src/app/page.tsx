"use client";

import dynamic from "next/dynamic";

// Dynamically import the main App component with SSR disabled
const App = dynamic(() => import("../App"), { ssr: false });

export default function Page() {
  return <App />;
}
