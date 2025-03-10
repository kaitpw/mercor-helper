import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

interface Props {
    oldText: string;
    newText: string;
    lang: string;
}

export default function Diff({ oldText, newText, lang }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

    useEffect(() => {
        if (containerRef.current && !editorRef.current) {
            editorRef.current = monaco.editor.createDiffEditor(
                containerRef.current,
                {
                    theme: "vs-dark",
                    automaticLayout: true,
                    renderSideBySide: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 10,
                },
            );
        }

        if (editorRef.current) {
            const originalModel = monaco.editor.createModel(oldText, lang);
            const modifiedModel = monaco.editor.createModel(newText, lang);

            editorRef.current.setModel({
                original: originalModel,
                modified: modifiedModel,
            });

            return () => {
                originalModel.dispose();
                modifiedModel.dispose();
            };
        }
    }, [oldText, newText, lang]);

    // useEffect(() => {
    //     return () => {
    //         editorRef.current?.dispose();
    //     };
    // }, []);

    if (oldText === newText) {
        return (
            <div className="p-4 text-center text-gray-500 border rounded-md">
                No differences found - both texts are identical
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            style={{ height: "600px" }}
            className="border rounded-md overflow-hidden"
        />
    );
}
