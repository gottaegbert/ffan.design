"use strict";
exports.__esModule = true;
exports.StoreProvider = exports.Context = void 0;
var react_1 = require("react");
var react_2 = require("react");
var initialState = {
    mouse: { x: 0, y: 0 }
};
exports.Context = react_1.createContext(initialState);
exports.StoreProvider = function (_a) {
    var children = _a.children;
    var _b = react_2.useState(initialState.mouse), mouse = _b[0], setMouse = _b[1];
    react_1.useEffect(function () {
        document.addEventListener("mousemove", onMouseMove);
        return function () { return document.removeEventListener("mousemove", onMouseMove); };
    }, []);
    var onMouseMove = function (e) {
        requestAnimationFrame(function () {
            setMouse({
                x: e.clientX,
                y: e.clientY
            });
        });
    };
    var providerValue = react_1["default"].useMemo(function () { return ({
        mouse: mouse
    }); }, [mouse]);
    return react_1["default"].createElement(exports.Context.Provider, { value: providerValue }, children);
};
