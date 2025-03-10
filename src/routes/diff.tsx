import { createFileRoute } from "@tanstack/react-router";
// import Diff from "@/components/Diff";
import { store } from "@/lib/diff-store";
import { useStore } from "@tanstack/react-store";
import Editor, { loader } from "@monaco-editor/react";
import { detectLanguage } from "@/lib/language-detector";
import { useEffect } from "react";
import Diff from "@/components/MonacoDiff";

export const Route = createFileRoute("/diff")({
    component: RouteComponent,
});

function RouteComponent() {
    const UNLOCK_TIMEOUT = 3000;
    const oldText = useStore(store, (state) => state.oldText);
    const newText = useStore(store, (state) => state.newText);
    const lang = useStore(store, (state) => state.lang);
    const isLocked = useStore(store, (state) => state.isLocked);

    // Register the Tomorrow Night Bright theme
    useEffect(() => {
        // Define a function to load and register the custom theme
        const registerCustomTheme = async () => {
            const monaco = await loader.init();

            // Fetch the theme data from the public folder
            try {
                const response = await fetch("/tomorrow-night-bright.json");
                const themeData = await response.json();

                // Register the theme
                monaco.editor.defineTheme("tomorrow-night-bright", themeData);

                console.log(
                    "Tomorrow Night Bright theme registered successfully",
                );
            } catch (error) {
                console.error("Failed to load theme:", error);
            }
        };

        registerCustomTheme();
    }, []);

    const languages = [
        { value: "json" },
        { value: "typescript" },
        { value: "javascript" },
        { value: "tsx" },
        { value: "jsx" },
        { value: "python" },
        { value: "sql" },
        { value: "html" },
        { value: "css" },
        { value: "markdown" },
        { value: "bash" },
        { value: "shell" },
    ];

    return (
        <div className="p-4 flex flex-col gap-4 w-[1200px] mx-auto">
            <div className="">
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
                    {languages.map(({ value }) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
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
                >
                    {isLocked
                        ? "Unlock For " + UNLOCK_TIMEOUT / 1000 + "s"
                        : "Locking again soon..."}
                </button>
            </div>
            <div className="flex gap-4 items-start">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block font-medium">
                            Original Text
                        </label>
                        <span className="">
                            {isLocked ? "Locked 🔒" : "Unlocked 🔓"}
                        </span>
                    </div>
                    <Editor
                        height="600px"
                        language={lang}
                        value={oldText}
                        onChange={(value) => {
                            if (!isLocked) {
                                const detectedLang = detectLanguage(
                                    value || "",
                                    languages,
                                );
                                store.setState((state) => ({
                                    ...state,
                                    oldText: value || "",
                                    newText: value || "",
                                    lang: detectedLang,
                                }));
                            }
                        }}
                        theme="tomorrow-night-bright"
                        options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 10,
                            readOnly: isLocked,
                        }}
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-md font-medium mb-2">
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
