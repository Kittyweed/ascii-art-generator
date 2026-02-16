"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
function App() {
    const [state, setState] = (0, react_1.useState)({
        imagePath: null,
        imagePreview: null,
        width: 100,
        invert: false,
        output: '',
        loading: false,
    });
    const handleSelectFile = async () => {
        const path = await window.electronAPI.selectFile();
        if (path) {
            setState(prev => ({
                ...prev,
                imagePath: path,
                imagePreview: `file://${path}`,
            }));
        }
    };
    const handleGenerate = async () => {
        if (!state.imagePath)
            return;
        setState(prev => ({ ...prev, loading: true, output: 'Generating...' }));
        try {
            const result = await window.electronAPI.generateASCII({
                imagePath: state.imagePath,
                width: state.width,
                invert: state.invert,
            });
            setState(prev => ({ ...prev, output: result, loading: false }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                loading: false,
            }));
        }
    };
    const handleSave = async () => {
        if (!state.output)
            return;
        const defaultPath = `ascii-art-${Date.now()}.txt`;
        await window.electronAPI.saveFile(state.output, defaultPath);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "app", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "sidebar", children: [(0, jsx_runtime_1.jsx)("h1", { children: "ASCII Art Generator" }), (0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleSelectFile, className: "btn", children: "Select Image" }), state.imagePreview && ((0, jsx_runtime_1.jsx)("img", { src: state.imagePreview, alt: "preview", className: "preview" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("label", { children: ["Width: ", state.width] }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: "20", max: "500", value: state.width, onChange: (e) => setState(prev => ({ ...prev, width: parseInt(e.currentTarget.value) })) })] }), (0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: state.invert, onChange: (e) => setState(prev => ({ ...prev, invert: e.currentTarget.checked })) }), "Invert"] }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleGenerate, disabled: !state.imagePath || state.loading, className: "btn btn-primary", children: state.loading ? 'Generating...' : 'Generate' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "output-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("pre", { className: "output-text", children: state.output }) }), state.output && !state.loading && ((0, jsx_runtime_1.jsx)("button", { onClick: handleSave, className: "btn btn-secondary", children: "Save" }))] })] }) }));
}
exports.default = App;
