import { createFileRoute } from "@tanstack/react-router";
import { store } from "@/lib/diff-store";
import { useStore } from "@tanstack/react-store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const UNLOCK_TIMEOUT = 3000;

  const isLocked = useStore(store, (state) => state.isLocked);
  return (
    <div className="p-4 flex flex-col gap-4 w-[1200px] mx-auto text-7xl">
      <button
        onClick={() => {
          const setIsLocked = (value: boolean) => {
            store.setState((state) => ({
              ...state,
              isLocked: value,
            }));
          };
          setIsLocked(false);
          setTimeout(() => setIsLocked(true), 3000);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLocked
          ? "Unlock For " + UNLOCK_TIMEOUT / 1000 + "s"
          : "Locking again soon..."}
      </button>
      <button
        type="button"
        className="btn btn-secondary"
      >
        Default
      </button>
      <Button>Primary</Button>
    </div>
  );
}

export default App;
