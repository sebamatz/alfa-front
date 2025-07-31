# Error Boundaries

This project includes comprehensive error boundary components to handle JavaScript errors gracefully throughout the React application.

## Components

### 1. ErrorBoundary (Main)
Located at `src/components/ErrorBoundary.tsx`

This is the main error boundary that wraps the entire application. It catches errors anywhere in the component tree and displays a user-friendly fallback UI.

**Features:**
- Catches JavaScript errors in the component tree
- Displays a user-friendly error message
- Shows detailed error information in development mode
- Provides "Try Again" and "Refresh Page" buttons
- Supports custom fallback UI

### 2. ComponentErrorBoundary (Component-specific)
Located at `src/components/ComponentErrorBoundary.tsx`

A smaller error boundary for wrapping individual components or pages that need isolated error handling.

**Features:**
- Smaller, more focused error handling
- Component-specific error messages
- Retry functionality
- Development mode error details

### 3. useErrorHandler Hook
Located at `src/hooks/useErrorHandler.ts`

A custom hook for handling errors in functional components and triggering error boundaries programmatically.

## Usage

### Basic Usage (Already implemented in App.tsx)

```tsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      {/* Your app content */}
    </ErrorBoundary>
  );
}
```

### Component-specific Error Boundary

```tsx
import ComponentErrorBoundary from './components/ComponentErrorBoundary';

function MyPage() {
  return (
    <ComponentErrorBoundary componentName="MyPage">
      {/* Page content that might throw errors */}
    </ComponentErrorBoundary>
  );
}
```

### Custom Fallback UI

```tsx
<ErrorBoundary 
  fallback={
    <div>
      <h1>Custom Error Message</h1>
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  }
>
  {/* Your content */}
</ErrorBoundary>
```

### Using the Error Handler Hook

```tsx
import { useErrorHandler } from '../hooks/useErrorHandler';

function MyComponent() {
  const { handleError, handleAsyncError } = useErrorHandler();

  const handleClick = () => {
    try {
      // Some operation that might throw
      throw new Error('Something went wrong');
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleAsyncOperation = async () => {
    await handleAsyncError(async () => {
      // Async operation that might throw
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('API call failed');
      }
      return response.json();
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Trigger Error</button>
      <button onClick={handleAsyncOperation}>Async Operation</button>
    </div>
  );
}
```

## Error Boundary Behavior

1. **Error Catching**: Error boundaries catch JavaScript errors anywhere in their child component tree
2. **Logging**: Errors are logged to the console for debugging
3. **Fallback UI**: A user-friendly error message is displayed instead of the crashed component
4. **Development Mode**: In development, detailed error information is shown
5. **Recovery**: Users can retry the operation or refresh the page

## What Error Boundaries Don't Catch

Error boundaries do NOT catch errors in:
- Event handlers
- Asynchronous code (e.g., `setTimeout` or `requestAnimationFrame` callbacks)
- Server-side rendering
- Errors thrown in the error boundary itself

For these cases, use the `useErrorHandler` hook or try-catch blocks.

## Common Errors and Fixes

### 1. "Objects are not valid as a React child" Error

**Problem**: Trying to render an object directly in JSX
```tsx
// ❌ This will cause an error
<div>{someObject}</div>
```

**Solution**: Convert objects to strings or extract specific properties
```tsx
// ✅ Correct ways to handle objects
<div>{JSON.stringify(someObject)}</div>
<div>{someObject.propertyName}</div>
<div>{String(someObject)}</div>
```

**Fixed in this project**: The DataTable component now properly handles object values by converting them to strings before rendering.

### 2. Null/Undefined Access Errors

**Problem**: Accessing properties on null/undefined objects
```tsx
// ❌ This can cause errors
if (selectedBranch.trdbranch) { ... }
```

**Solution**: Use optional chaining
```tsx
// ✅ Safe property access
if (selectedBranch?.trdbranch) { ... }
```

## Best Practices

1. **Place strategically**: Wrap the entire app and individual pages/components that might fail
2. **Keep fallback UI simple**: Don't include complex components that might also fail
3. **Log errors**: Always log errors for debugging and monitoring
4. **Provide recovery options**: Give users ways to retry or navigate away
5. **Test error scenarios**: Intentionally throw errors to test your error boundaries
6. **Use optional chaining**: Always use `?.` when accessing object properties that might be null/undefined
7. **Validate data types**: Check data types before rendering to prevent "Objects are not valid as React child" errors

## Example: Testing Error Boundaries

```tsx
// Component that throws an error for testing
function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error for error boundary');
  }

  return (
    <div>
      <button onClick={() => setShouldThrow(true)}>
        Throw Error (Test Error Boundary)
      </button>
    </div>
  );
}
```

## Recent Fixes Applied

1. **DataTable Component**: Added proper type checking to prevent rendering objects directly
2. **Orders Component**: Added optional chaining for `selectedBranch` access
3. **NewOrder Component**: Fixed conditional rendering logic
4. **Error Boundary Integration**: Wrapped the entire application to catch and handle errors gracefully 