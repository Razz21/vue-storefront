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
export * from './utils';
export * from './types';
declare global {
    interface Window {
        $vuestorefront: any;
    }
}
export declare function track(id: string): void;
