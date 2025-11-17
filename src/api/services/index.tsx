/**
 * OBSOLETE FILE - This file is no longer needed with Vite
 *
 * PREVIOUS WEBPACK IMPLEMENTATION:
 * This file was designed to automatically discover and collect all service providers
 * using webpack's require.context() feature. The pattern was:
 *
 * 1. require.context() would scan the services directory at build time
 * 2. It would find all index.tsx files in subdirectories
 * 3. requireAllServices() would extract the StoreProvider from each module
 * 4. getAllServices() would return an array of all providers
 * 5. App.tsx would import this array and compose all providers together
 *
 * PROBLEMS WITH THIS APPROACH:
 * - require.context() is webpack-specific and doesn't exist in Vite
 * - The code was already broken (trying to default import User when it doesn't exist)
 * - It added unnecessary indirection and complexity
 * - Type safety was poor (React.FC<any>[])
 * - No tree-shaking benefits - all services loaded even if unused
 *
 * CURRENT VITE IMPLEMENTATION:
 * - Direct imports: Each service is imported explicitly where needed
 * - Better tree-shaking: Only imported services are bundled
 * - Type safety: Full TypeScript support with proper types
 * - Simpler: No magic, explicit is better than implicit
 * - Works with Vite's ESM-based architecture
 *
 * EXAMPLE OF OLD PATTERN (if it worked):
 *   import providers from './api/services'
 *   providers.forEach(Provider => <Provider>...</Provider>)
 *
 * CURRENT PATTERN (what we use now):
 *   import { StoreProvider as UserStoreProvider } from './api/services/User'
 *   <UserStoreProvider>...</UserStoreProvider>
 */

// This file is kept for documentation purposes only
// It should be deleted as it serves no functional purpose
