"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDraggable = require("react-draggable");

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _reactResizable = require("react-resizable");

var _DialogTitle = require("./DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _DialogBody = require("./DialogBody");

var _DialogBody2 = _interopRequireDefault(_DialogBody);

var _DialogFooter = require("./DialogFooter");

var _DialogFooter2 = _interopRequireDefault(_DialogFooter);

var _activeEventStack = require("active-event-stack");

var _activeEventStack2 = _interopRequireDefault(_activeEventStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = function (_React$Component) {
    (0, _inherits3.default)(Dialog, _React$Component);

    function Dialog(props) {
        (0, _classCallCheck3.default)(this, Dialog);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));

        _this.componentWillUnmount = function () {
            _activeEventStack2.default.removeListenable(_this.eventToken);
        };

        _this.handleGlobalKeydown = function (e) {
            if (_this.props.closeOnEscape && e.keyCode == 27) {
                e.stopPropagation();
                _this.onClose();
            }

            return false;
        };

        _this.onClose = function () {
            if (_this.props.onClose) {
                _this.props.onClose();
            }
        };

        _this.onMinimize = function () {
            _this.setState({ isMinimized: true, isMaximized: false });
        };

        _this.onMaximize = function () {
            _this.setState({ isMinimized: false, isMaximized: true });
        };

        _this.onRestore = function () {
            _this.setState({ isMinimized: false, isMaximized: false });
        };

        _this.onResize = function (event, _ref) {
            var element = _ref.element,
                size = _ref.size;

            _this.setState({ width: size.width, height: size.height });
        };

        _this.getDialogTitle = function () {
            return _react2.default.createElement(_DialogTitle2.default, {
                title: _this.props.title,
                hasCloseIcon: _this.props.hasCloseIcon,
                allowMinimize: _this.props.allowMinimize,
                allowMaximize: _this.props.allowMaximize,
                isMinimized: _this.state.isMinimized,
                isMaximized: _this.state.isMaximized,
                onMinimize: _this.onMinimize,
                onMaximize: _this.onMaximize,
                onRestore: _this.onRestore,
                onClose: _this.onClose
            });
        };

        _this.state = {
            height: props.height,
            width: props.width,
            isMinimized: false,
            isMaximized: false
        };
        return _this;
    }

    (0, _createClass3.default)(Dialog, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            /**
             * This is done in the componentWillMount instead of the componentDidMount
             * because this way, a modal that is a child of another will have register
             * for events after its parent
             */
            this.eventToken = _activeEventStack2.default.addListenable([["keydown", this.handleGlobalKeydown]]);
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                height = _state.height,
                width = _state.width,
                isMinimized = _state.isMinimized,
                isMaximized = _state.isMaximized;
            var _props = this.props,
                modal = _props.modal,
                isDraggable = _props.isDraggable,
                isResizable = _props.isResizable,
                buttons = _props.buttons,
                children = _props.children,
                position = _props.position;
            var _position$x = position.x,
                x = _position$x === undefined ? -width / 2 : _position$x,
                _position$y = position.y,
                y = _position$y === undefined ? -height / 2 : _position$y;


            var dialog = _react2.default.createElement(
                "div",
                { style: { height: height, width: width, transform: "translate(" + x + "px, " + y + "px)" }, className: (0, _classnames2.default)("ui-dialog", { "minimized": isMinimized, "maximized": isMaximized }) },
                this.getDialogTitle(),
                !isMinimized && _react2.default.createElement(
                    _DialogBody2.default,
                    null,
                    children
                ),
                !isMinimized && _react2.default.createElement(_DialogFooter2.default, { buttons: buttons, onClose: this.onClose })
            );

            if (!isMinimized && !isMaximized && isResizable) {
                dialog = _react2.default.createElement(
                    _reactResizable.Resizable,
                    { className: "box", height: height, width: width, onResize: this.onResize },
                    dialog
                );
            }

            if (!isMinimized && !isMaximized && isDraggable !== false) {
                dialog = _react2.default.createElement(
                    _reactDraggable2.default,
                    { handle: ".ui-dialog-titlebar", bounds: "body", defaultPosition: { x: x, y: y } },
                    dialog
                );
            }

            return _react2.default.createElement(
                "div",
                {
                    className: (0, _classnames2.default)("ui-dialog-container", { "": modal }) },
                dialog,
                modal && _react2.default.createElement("div", { className: "ui-dialog-overlay" })
            );
        }
    }]);
    return Dialog;
}(_react2.default.Component);

Dialog.propTypes = {
    height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    modal: _propTypes2.default.bool,
    position: _propTypes2.default.shape({
        x: _propTypes2.default.number,
        y: _propTypes2.default.number
    }),
    hasCloseIcon: _propTypes2.default.bool,
    allowMinimize: _propTypes2.default.bool,
    allowMaximize: _propTypes2.default.bool,
    isResizable: _propTypes2.default.bool,
    title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
    closeOnEscape: _propTypes2.default.bool,
    onClose: _propTypes2.default.func,
    children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.element]).isRequired,
    buttons: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({
        text: _propTypes2.default.string,
        onClick: _propTypes2.default.func
    })), _propTypes2.default.arrayOf(_propTypes2.default.element)])
};

Dialog.defaultProps = {
    height: 300,
    width: 500,
    modal: false,
    closeOnEscape: true,
    isDraggable: false,
    isResizable: false,
    title: '',
    hasCloseIcon: true,
    allowMinimize: false,
    allowMaximize: false,
    onClose: null,
    buttons: null,
    position: { x: -250, y: -150 }
};

exports.default = Dialog;