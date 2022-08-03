/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var LogName;
(function (LogName) {
    LogName["Error"] = "error";
    LogName["Info"] = "info";
    LogName["Debug"] = "debug";
    LogName["None"] = "none";
    LogName["Warn"] = "warn";
})(LogName || (LogName = {}));
var LogLevelStyle = {
    Log: 'background:#5ece7b; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;',
    Info: 'background:#0468DB; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff;',
    Warn: 'background:#ecc713; padding: 2px; border-radius: 0 2px 2px 0;  color: #000;',
    Error: 'background:#d12727; padding: 2px; border-radius: 0 2px 2px 0;  color: #fff'
};

var detectNode = Object.prototype
    .toString
    .call(typeof process !== 'undefined'
    ? process
    : 0) === '[object process]' ||
    process.env.APPLICATION_ENV === 'production';
var mountLog = function (name, style) {
    if (detectNode) {
        return ["".concat(name, ": ")];
    }
    return [
        "%c".concat(name, "%c:"),
        style,
        'background: transparent;'
    ];
};

function makeMessageStyle(logEnum) {
    switch (logEnum) {
        case LogName.Error:
            return mountLog('[VSF][error]', LogLevelStyle.Error);
        case LogName.Info:
            return mountLog('[VSF][info]', LogLevelStyle.Info);
        case LogName.Warn:
            return mountLog('[VSF][warn]', LogLevelStyle.Warn);
        case LogName.Debug:
            return mountLog('[VSF][debug]', LogLevelStyle.Log);
        case LogName.None:
        default:
            return mountLog('[VSF]', LogLevelStyle.Log);
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function makeMethod(logEnum, fn) {
    return function () {
        return Function.prototype.bind.apply(fn, __spreadArray([
            console
        ], makeMessageStyle(logEnum)));
    };
}

/* istanbul ignore file */
var defaultLogger = {
    debug: makeMethod(LogName.Debug, console.debug)(),
    info: makeMethod(LogName.Info, console.info)(),
    warn: makeMethod(LogName.Warn, console.warn)(),
    error: makeMethod(LogName.Error, console.error)()
};

var defaultModes = {
    // Test
    test: 'none',
    // Development
    dev: 'warn',
    development: 'warn',
    // Production
    prod: 'error',
    production: 'error',
    // Fallback
    default: 'warn'
};
var Logger = defaultLogger;
var registerLogger = function (loggerImplementation, verbosity) {
    if (typeof loggerImplementation === 'function') {
        Logger = loggerImplementation(verbosity);
        return;
    }
    switch (verbosity) {
        case 'info':
            Logger = __assign(__assign(__assign({}, defaultLogger), loggerImplementation), { debug: function () { } });
            break;
        case 'warn':
            Logger = __assign(__assign(__assign({}, defaultLogger), loggerImplementation), { info: function () { }, debug: function () { } });
            break;
        case 'error':
            Logger = __assign(__assign(__assign({}, defaultLogger), loggerImplementation), { info: function () { }, warn: function () { }, debug: function () { } });
            break;
        case 'none':
            Logger = {
                debug: function () { },
                info: function () { },
                warn: function () { },
                error: function () { }
            };
            break;
        default:
            Logger = __assign(__assign({}, defaultLogger), loggerImplementation);
    }
};
registerLogger(defaultLogger, defaultModes[process.env.NODE_ENV] || defaultModes.default);

var maskString = function (el) { return "".concat(el.charAt(0), "***").concat(el.slice(-1)); };
var maskAny = function (el) {
    if (typeof el === 'string') {
        return maskString(el);
    }
    return '***';
};
var mask = function (el) {
    if (typeof el === 'object' && !Array.isArray(el)) {
        return Object.keys(el).reduce(function (prev, key) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = maskAny(el[key]), _a)));
        }, {});
    }
    return maskAny(el);
};

/* istanbul ignore file */
/**
 * Default name of the cookie storing active localization code
 */
var VSF_LOCALE_COOKIE = 'vsf-locale';
/**
 * Default name of the cookie storing active currency code
 */
var VSF_CURRENCY_COOKIE = 'vsf-currency';
/**
 * Default name of the cookie storing active country code
 */
var VSF_COUNTRY_COOKIE = 'vsf-country';
/**
 * Default name of the cookie storing active store code
 */
var VSF_STORE_COOKIE = 'vsf-store';
/**
 * Default name of the cookie storing active channel code
 */
var VSF_CHANNEL_COOKIE = 'vsf-channel';
// TODO - remove this interface
var AgnosticOrderStatus;
(function (AgnosticOrderStatus) {
    AgnosticOrderStatus["Open"] = "Open";
    AgnosticOrderStatus["Pending"] = "Pending";
    AgnosticOrderStatus["Confirmed"] = "Confirmed";
    AgnosticOrderStatus["Shipped"] = "Shipped";
    AgnosticOrderStatus["Complete"] = "Complete";
    AgnosticOrderStatus["Cancelled"] = "Cancelled";
    AgnosticOrderStatus["Refunded"] = "Refunded";
})(AgnosticOrderStatus || (AgnosticOrderStatus = {}));

/**
 * Core Vue Storefront 2 library.
 *
 * @remarks
 * The `@vue-storefront/core` library is a core of the whole Vue Storefront 2 application.
 * It defines common interfaces for all eCommerce integrations, factories for creating
 * composables, logger, SSR helpers and more.
 *
 * @packageDocumentation
 */
if (typeof window !== 'undefined') {
    window.$vuestorefront = window.$vuestorefront || { integrations: [] };
}
function track(id) {
    if (typeof window !== 'undefined') {
        if (window.$vuestorefront) {
            window.$vuestorefront.integrations.push(id);
        }
    }
}

export { AgnosticOrderStatus, Logger, VSF_CHANNEL_COOKIE, VSF_COUNTRY_COOKIE, VSF_CURRENCY_COOKIE, VSF_LOCALE_COOKIE, VSF_STORE_COOKIE, mask, registerLogger, track };
//# sourceMappingURL=index.es.js.map
