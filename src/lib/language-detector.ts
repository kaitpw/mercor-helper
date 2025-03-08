import hljs from "highlight.js";

/**
 * Detects the programming language of the given code using highlight.js
 * @param code The source code to analyze
 * @returns The detected language identifier or 'plaintext' if detection fails
 */
export function detectLanguage(
    code: string,
    languages: { value: string }[],
): string {
    if (!code.trim()) {
        return "plaintext";
    }

    try {
        const result = hljs.highlightAuto(
            code,
            languages.map(({ value }) => value),
        );
        return result.language || "plaintext";
    } catch (error) {
        console.error("Language detection failed:", error);
        return "plaintext";
    }
}
