import { DiffModeEnum, DiffView } from "@git-diff-view/react";
import { generateDiffFile } from "@git-diff-view/file";
import { useMemo } from "react";
import "@git-diff-view/react/styles/diff-view.css";
interface Props {
    oldText: string;
    newText: string;
    lang: string;
}

export default function Diff({ oldText, newText, lang }: Props) {
    const getDiffFile = () => {
        try {
            // Check if texts are identical
            if (oldText === newText) {
                return null;
            }

            const instance = generateDiffFile(
                "oldFileName",
                oldText,
                "newFileName",
                newText,
                lang,
                lang,
            );
            instance.initRaw();
            return instance;
        } catch (error) {
            console.error("Error generating diff:", error);
            return null;
        }
    };

    const diffFile = useMemo(() => getDiffFile(), [oldText, newText, lang]);

    if (oldText === newText) {
        return (
            <div className="p-4 text-center text-gray-500 border rounded-md">
                No differences found - both texts are identical
            </div>
        );
    }

    return (
        <div id="ABOVEWRAPPER">
            <DiffView
                diffFile={diffFile || undefined}
                diffViewWrap={false}
                // diffViewAddWidget
                // renderWidgetLine={({ onClose }) => {
                //     return (
                //         <div
                //             style={{
                //                 display: "flex",
                //                 border: "1px solid",
                //                 padding: "10px",
                //                 justifyContent: "space-between",
                //             }}
                //         >
                //             123
                //             <button
                //                 style={{
                //                     border: "1px solid",
                //                     borderRadius: "2px",
                //                     padding: "4px 8px",
                //                 }}
                //                 onClick={onClose}
                //             >
                //                 close
                //             </button>
                //         </div>
                //     );
                // }}
                diffViewFontSize={10}
                diffViewTheme={"light"}
                diffViewHighlight={true}
                diffViewMode={DiffModeEnum.Split}
            />
        </div>
    );
}
