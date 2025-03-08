import { createFileRoute } from "@tanstack/react-router";
import Diff from "@/components/Diff";
import { store } from "@/lib/diff-store";
import { useStore } from "@tanstack/react-store";
import Editor from "@monaco-editor/react";

export const Route = createFileRoute("/diff")({
    component: RouteComponent,
});

function RouteComponent() {
    const oldText = useStore(store, (state) => state.oldText);
    const newText = useStore(store, (state) => state.newText);
    const lang = useStore(store, (state) => state.lang);
    const isLocked = useStore(store, (state) => state.isLocked);

    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "tsx", label: "TSX" },
        { value: "jsx", label: "JSX" },
        { value: "python", label: "Python" },
        { value: "json", label: "JSON" },
    ];

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="w-40">
                <label className="block text-sm font-medium mb-2">
                    Language
                </label>
                <select
                    value={lang}
                    onChange={(e) =>
                        store.setState((state) => ({
                            ...state,
                            lang: e.target.value,
                        }))}
                    className="w-full p-2 border rounded-md"
                >
                    {languages.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>
            <div className="flex gap-4 items-start">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                            Old Text
                        </label>
                        <button
                            onClick={() =>
                                store.setState((state) => ({
                                    ...state,
                                    isLocked: !state.isLocked,
                                }))}
                            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                        >
                            {isLocked ? "🔒 Locked" : "🔓 Unlocked"}
                        </button>
                    </div>
                    <Editor
                        height="600px"
                        language={lang}
                        value={oldText}
                        onChange={(value) => {
                            if (!isLocked) {
                                store.setState((state) => ({
                                    ...state,
                                    oldText: value || "",
                                    newText: value || "",
                                }));
                            }
                        }}
                        theme="vs-dark"
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 10,
                            readOnly: isLocked,
                        }}
                        className="border rounded-md overflow-hidden"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">
                        New Text
                    </label>
                    <Editor
                        height="600px"
                        language={lang}
                        value={newText}
                        theme="vs-dark"
                        onChange={(value) =>
                            store.setState((state) => ({
                                ...state,
                                newText: value || "",
                            }))}
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 10,
                        }}
                        className="border rounded-md overflow-hidden"
                    />
                </div>
            </div>
            <Diff
                oldText={oldText}
                newText={newText}
                lang={lang}
            />
        </div>
    );
}
