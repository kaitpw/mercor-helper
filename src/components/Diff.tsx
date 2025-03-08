import React, { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer";
import Prism from "prismjs";

const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;
const newCode = `
const a = 10
const boo = 10

if(a === 10) {
  console.log('bar')
}
`;

class Diff extends PureComponent {
    syntaxHighlight = (str: string): any => {
        if (!str) return;
        const language = Prism.highlight(
            str,
            Prism.languages.javascript,
            "javascript",
        );
        return <code dangerouslySetInnerHTML={{ __html: language }}></code>;
    };

    render = () => {
        return (
            <ReactDiffViewer
                oldValue={oldCode}
                newValue={newCode}
                splitView={true}
                renderContent={this.syntaxHighlight}
            />
        );
    };
}

export default Diff;
