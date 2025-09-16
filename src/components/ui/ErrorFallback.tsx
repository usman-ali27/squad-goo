import { FallbackProps } from 'react-error-boundary';
import { Button } from './button';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // You can log the error to an error reporting service here
  // console.error(error);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4"
      role="alert"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Oops! Something went wrong.</h1>
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        {/* Optional: Display error message in development for easier debugging */}
        {import.meta.env.DEV && (
          <pre className="bg-muted text-destructive-foreground p-4 rounded-md text-sm text-left my-4 overflow-auto max-w-lg">
            <code>{error.message}</code>
          </pre>
        )}
        <Button onClick={resetErrorBoundary} variant="destructive">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
