'use strict';

function extendStaticObject(base, overrides) {
    var oldBase = Object.assign({}, base);
    for (var _iterator = Object.keys(overrides), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var overrideKey = _ref;

        base[overrideKey] = overrides[overrideKey](oldBase);
    }
}

function injectReactDevToolsHook(injectModule) {
    if (!global.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { inject: function inject() {} };
    }
    var oldInject = global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject;
    global.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function (x) {
        var ReactMount = x.Mount;
        if (oldInject) {
            oldInject(x);
        }
        injectModule(x);
    };
}

if (process.env.enableReactTesting) {
    global.ReactTesting = {
        addRenderContainer: function addRenderContainer() {},
        removeRenderContainer: function removeRenderContainer() {}
    };
    injectReactDevToolsHook(exposeReactInternalsIntoDomHook);
}

function exposeReactInternalsIntoDomHook(_ref2) {
    var Mount = _ref2.Mount,
        Reconciler = _ref2.Reconciler;

    var ReactMount = Mount;
    extendStaticObject(Reconciler, {
        receiveComponent: function receiveComponent(base) {
            return function (instance, nextElement, transaction, context) {
                base.receiveComponent(instance, nextElement, transaction, context);

                var prevElement = instance._currentElement;
                if (nextElement === prevElement && context === instance._context) {
                    return;
                }

                if (instance._currentElement && instance._currentElement.type) {
                    var domElement = getTargetNode(instance, ReactMount);
                    updateDomElement(domElement, instance, false);
                }
            };
        },

        mountComponent: function mountComponent(base) {
            return function (instance, tr, host, hostParent, hostContainerInfo, context) {
                for (var _len = arguments.length, rest = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
                    rest[_key - 6] = arguments[_key];
                }

                var result = base.mountComponent.apply(base, [instance, tr, host, hostParent, hostContainerInfo, context].concat(rest));
                if (typeof result === 'string') {
                    // React 0.14.*
                    var resultDomElement = createDomFromString(result);
                    if (!resultDomElement) {
                        return result;
                    }
                    updateDomElement(resultDomElement, instance, true);
                    return resultDomElement.outerHTML;
                } else if (result.node) {
                    // React 15.*
                    updateDomElement(result.node, instance, true);
                }
                return result;
            };
        }
    });
}

function stringifySafe(value) {
    if (typeof value === 'string') {
        return value;
    }
    if (value === undefined || value === null) {
        return '';
    }
    try {
        return JSON.stringify(value);
    } catch (e) {
        try {
            if (Array.isArray(value) && value.length > 0 && Array.isArray(value[0])) {
                return JSON.stringify(value.map(function (x) {
                    return x[0];
                }));
            }
        } catch (e) {
            return '';
        }
        return '';
    }
}

function createDomFromString(s) {
    var rootDomElement;
    if (s.startsWith('<tbody') || s.startsWith('<tfoot') || s.startsWith('<thead')) {
        rootDomElement = document.createElement('table');
    } else if (s.startsWith('<th') || s.startsWith('<td')) {
        rootDomElement = document.createElement('tr');
    } else if (s.startsWith('<tr')) {
        rootDomElement = document.createElement('thead');
    } else {
        rootDomElement = document.createElement('div');
    }
    rootDomElement.innerHTML = s;
    return rootDomElement.childNodes[0];
}

function getTargetNode(instance, ReactMount) {
    var result = getDomHostNode(instance);
    if (!result && typeof instance._rootNodeID === 'string') {
        try {
            result = ReactMount.getNode(instance._rootNodeID);
        } catch (e) {
            return null;
        }
    }
    return result;
}

function getComponentName(instance) {
    if (!instance._currentElement || !instance._currentElement.type) {
        return null;
    }
    return instance._currentElement.type.name;
}

function acceptProp(instance, propName, propValue) {
    return !propName.startsWith('$$') && !propName.startsWith('on') && propName !== 'children' && propName !== 'data-tid' && typeof propValue !== 'function';
}

function updateDomElement(domElement, instance, isMounting) {
    if (!domElement || typeof domElement.setAttribute !== 'function') {
        return;
    }
    var attrs = fillPropsForDomElementRecursive({}, instance);
    for (var attrName in attrs) {
        domElement.setAttribute(attrName, attrs[attrName]);
    }
}

function appendToSet(attrContainer, name, value) {
    if (value === null) return;
    var attributeStringValue = attrContainer[name];
    var set = (attributeStringValue || '').split(' ').filter(function (x) {
        return x !== '';
    });
    if (!set.includes(value)) {
        attrContainer[name] = (attributeStringValue ? attributeStringValue + ' ' : '') + value;
    }
}

function fillPropsForDomElementRecursive(attrContainer, instance) {
    attrContainer = fillPropsForDomElement(attrContainer, instance);
    var ownerInstance = instance._currentElement && instance._currentElement._owner;
    if (ownerInstance) {
        if (sameHostNodes(ownerInstance, instance)) {
            attrContainer = fillPropsForDomElementRecursive(attrContainer, ownerInstance);
        }
    }
    return attrContainer;
}

function fillPropsForDomElement(attrContainer, instance) {
    var instanceProps = instance._currentElement && instance._currentElement.props;
    if (getComponentName(instance)) {
        appendToSet(attrContainer, 'data-comp-name', getComponentName(instance));
    }
    if (instanceProps) {
        if (instanceProps['data-tid']) {
            appendToSet(attrContainer, 'data-tid', instanceProps['data-tid']);
        }
        for (var prop in instanceProps) {
            if (acceptProp(instance, prop, instanceProps[prop])) {
                attrContainer['data-prop-' + prop] = stringifySafe(instanceProps[prop]);
            }
        }
    }
    return attrContainer;
}

function sameHostNodes(instance1, instance2) {
    if (typeof instance1._rootNodeID === 'string' || typeof instance2._rootNodeID === 'string') {
        // React 0.14.*
        var nodeId1 = instance1._rootNodeID;
        var nodeId2 = instance2._rootNodeID;
        if (nodeId1 !== null && nodeId2 !== null) {
            return nodeId1 === nodeId2;
        }
    }

    var node1 = getDomHostNode(instance1);
    var node2 = getDomHostNode(instance2);
    return node1 !== null && node2 !== null && node1 === node2;
}

function getDomHostNode(instance) {
    if (instance._hostNode) {
        return instance._hostNode;
    }
    if (instance._renderedComponent) {
        return getDomHostNode(instance._renderedComponent);
    }
    return null;
}