import { createFileRoute } from "@tanstack/react-router";
import Diff from "@/components/Diff";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <Diff />
    </div>
  );
}
