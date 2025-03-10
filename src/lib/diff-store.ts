import { Store } from "@tanstack/store";

export const store = new Store({
    oldText: temp1(),
    newText: temp2(),
    lang: "tsx",
    isLocked: true,
});

store.subscribe(() => {
    console.log("Store changed:", {
        oldText: store.state.oldText,
        newText: store.state.newText,
        lang: store.state.lang,
        isLocked: store.state.isLocked,
    });
});

function temp1(): string {
    return `import { Effect, Store } from "@tanstack/store";

export const store = new Store({
    oldText: temp1(),
    newText: temp2(),
    lang: "tsx",
    isLocked: true,
});

store.subscribe(() => {
    console.log("Store changed:", {
        oldText: store.state.oldText,
        newText: store.state.newText,
        lang: store.state.lang,
        isLocked: store.state.isLocked,
    });
});`;
}
function temp2() {
    return `import { Effect, Store } from "@tanstack/store";

export const store = new Store({
    oldText: temp1(),
    newText: temp2(),
    lang: "tsx",
    isLocked: true,
});
// new comment here
store.subscribe(() => {
    console.log("Store changed:", {
        oldText: store.state.oldText,
        newText: store.state.newText,
        lang: store.state.lang,
        isLocked: store.state.isLocked,
    });
});`;
}
