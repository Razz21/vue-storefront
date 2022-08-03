import type { Request, Response, Express } from 'express';
import type { HelmetOptions } from 'helmet';
/**
 * Default name of the cookie storing active localization code
 */
export declare const VSF_LOCALE_COOKIE = "vsf-locale";
/**
 * Default name of the cookie storing active currency code
 */
export declare const VSF_CURRENCY_COOKIE = "vsf-currency";
/**
 * Default name of the cookie storing active country code
 */
export declare const VSF_COUNTRY_COOKIE = "vsf-country";
/**
 * Default name of the cookie storing active store code
 */
export declare const VSF_STORE_COOKIE = "vsf-store";
/**
 * Default name of the cookie storing active channel code
 */
export declare const VSF_CHANNEL_COOKIE = "vsf-channel";
export declare type CustomQuery = Record<string, string>;
export declare type ComposableFunctionArgs<T> = T & {
    customQuery?: CustomQuery;
};
export interface ProductsSearchParams {
    perPage?: number;
    page?: number;
    sort?: any;
    term?: any;
    filters?: any;
    [x: string]: any;
}
export interface UseProductErrors {
    search: Error;
}
export interface UseSearchErrors {
    search: Error;
}
export interface IntegrationContext<CLIENT = any, CONFIG = any, API = any> {
    client: CLIENT;
    config: CONFIG;
    api: API;
    [x: string]: any;
}
export interface Context<CLIENT = any, CONFIG = any, API = any> {
    [x: string]: IntegrationContext<CLIENT, CONFIG, API> | any;
}
export declare type PlatformApi = {
    [functionName: string]: (context: Context, ...args: any[]) => Promise<any>;
};
export declare type ContextedPlatformApi<T extends PlatformApi> = {
    [P in keyof T]: T[P] extends (context: Context, ...arg: infer X) => Promise<any> ? (...arg: X) => Promise<any> : never;
};
export interface AgnosticFacetSearchParams {
    categorySlug?: string;
    rootCatSlug?: string;
    term?: string;
    page?: number;
    itemsPerPage?: number;
    sort?: string;
    filters?: Record<string, string[]>;
    metadata?: any;
    [x: string]: any;
}
export interface FacetSearchResult<S> {
    data: S;
    input: AgnosticFacetSearchParams;
}
export interface UseContentErrors {
    search: Error;
}
export interface AgnosticPrice {
    regular: number | null;
    special?: number | null;
}
export interface AgnosticMediaGalleryItem {
    small: string;
    normal: string;
    big: string;
}
export interface AgnosticAttribute {
    name?: string;
    value: string | Record<string, any>;
    label: string;
}
export interface AgnosticBreadcrumb {
    text: string;
    link: string;
}
export interface AgnosticTotals {
    total: number;
    subtotal: number;
    special?: number;
    [x: string]: unknown;
}
export interface AgnosticCoupon {
    id: string;
    name: string;
    code: string;
    value: number;
}
export interface AgnosticDiscount {
    id: string;
    name: string;
    description: string;
    value: number;
    code?: string;
}
export interface AgnosticCategoryTree {
    label: string;
    slug?: string;
    items: AgnosticCategoryTree[];
    isCurrent: boolean;
    count?: number;
    [x: string]: unknown;
}
export interface AgnosticFilter {
    id: string;
    label: string;
    values: {
        id: string;
        isSlected?: boolean;
        count?: number;
        label: string;
        value: string;
    }[];
}
export interface AgnosticProductReview {
    id: string;
    author: string;
    date: Date;
    message: string | null;
    rating: number | null;
}
export interface AgnosticLocale {
    code: string;
    label: string;
    [x: string]: unknown;
}
export interface AgnosticCountry {
    code: string;
    label: string;
    [x: string]: unknown;
}
export interface AgnosticCurrency {
    code: string;
    label: string;
    prefixSign: boolean;
    sign: string;
    [x: string]: unknown;
}
export interface AgnosticSortByOption {
    label: string;
    value: string;
    [x: string]: unknown;
}
export interface AgnosticRateCount {
    rate: number;
    count: number;
}
export declare enum AgnosticOrderStatus {
    Open = "Open",
    Pending = "Pending",
    Confirmed = "Confirmed",
    Shipped = "Shipped",
    Complete = "Complete",
    Cancelled = "Cancelled",
    Refunded = "Refunded"
}
export interface AgnosticFacet {
    type: string;
    id: string;
    value: any;
    attrName?: string;
    count?: number;
    selected?: boolean;
    metadata?: any;
}
export interface AgnosticGroupedFacet {
    id: string;
    label: string;
    count?: number;
    options: AgnosticFacet[];
}
export interface AgnosticSort {
    options: AgnosticFacet[];
    selected: string;
}
export interface AgnosticPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    pageOptions: number[];
}
export interface AgnosticAddress {
    addressLine1: string;
    addressLine2: string;
    [x: string]: unknown;
}
export interface AgnosticGeoLocation {
    type: string;
    coordinates?: unknown;
    [x: string]: unknown;
}
export interface AgnosticStore {
    name: string;
    id: string;
    description?: string;
    locales?: AgnosticLocale[];
    currencies?: AgnosticCurrency[];
    address?: AgnosticAddress;
    geoLocation?: AgnosticGeoLocation;
    [x: string]: unknown;
}
export interface VSFLogger {
    debug(message?: any, ...args: any): void;
    info(message?: any, ...args: any): void;
    warn(message?: any, ...args: any): void;
    error(message?: any, ...args: any): void;
}
export interface FactoryParams<API extends PlatformApi = any> {
    provide?: (context: Context) => any;
    api?: Partial<API>;
}
export interface HookParams<C> {
    configuration: C;
}
export interface CallHookParams<C> extends HookParams<C> {
    callName: string;
}
export declare type BeforeCallArgs = any;
export declare type AfterCallArgs = any;
export interface BeforeCallParams<C> extends CallHookParams<C> {
    args: BeforeCallArgs;
}
export interface AfterCallParams<C> extends CallHookParams<C> {
    response: AfterCallArgs;
}
export interface ApiClientExtensionHooks<C = any> {
    beforeCreate?: (params: HookParams<C>) => C;
    afterCreate?: (params: HookParams<C>) => C;
    beforeCall?: (params: BeforeCallParams<C>) => BeforeCallArgs;
    afterCall?: (params: AfterCallParams<C>) => AfterCallArgs;
}
export declare type CustomQueryFn<T = any> = ({ query, variables, metadata }: {
    query: any;
    variables: T;
    metadata: any;
}) => {
    query?: any;
    variables?: T;
    metadata: any;
};
export declare type ApiClientMethod = (...args: any) => Promise<any>;
export interface ApiClientExtension {
    name: string;
    extendApiMethods?: Record<string, ApiClientMethod>;
    extendApp?: ({ app, configuration }: {
        app: Express;
        configuration: any;
    }) => void;
    hooks?: (req: Request, res: Response) => ApiClientExtensionHooks;
}
export interface Integration {
    location: string;
    configuration: any;
    extensions?: (extensions: ApiClientExtension[]) => ApiClientExtension[];
    customQueries?: Record<string, CustomQueryFn>;
}
export declare type IntegrationsSection = Record<string, Integration>;
export interface MiddlewareConfig {
    integrations: Record<string, Integration>;
    helmet?: boolean | Readonly<HelmetOptions>;
}
export interface ApiClientFactoryParams<T, F = any> {
    api: F;
    isProxy?: boolean;
    onCreate: (config: T, headers?: Record<string, string>) => {
        config: T;
        client: any;
    };
    extensions?: ApiClientExtension[];
}
export interface ApiInstance {
    api: any;
    client: any;
    settings: any;
}
export declare type CreateApiProxyFn = (givenConfig: any, customApi?: any) => ApiInstance;
export declare type CreateApiClientFn = (givenConfig: any, customApi?: any) => ApiInstance;
export interface ApiClientFactory {
    createApiClient: CreateApiClientFn;
    /**
     * Sets up integration config, runs once.
     */
    init?: (configuration: Record<string, any>) => Record<string, any>;
}
export interface ApiClientConfig {
    [x: string]: any;
    client?: any;
    extensions?: ApiClientExtension[];
}
export declare type ApiClientMethods<T> = {
    [K in keyof T]: T[K] extends (...args: any) => any ? (...args: [...Parameters<T[K]>, CustomQuery?]) => ReturnType<T[K]> : T[K];
};
