import { Component } from "react";
import toast from "react-hot-toast";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
    toast.error("Something went wrong. Please refresh the page.");
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/25 bg-yellow-500/10 text-2xl font-black text-yellow-500">
              !
            </div>

            <h1 className="mb-3 font-serif text-4xl font-black">Oops!</h1>
            <p className="mb-6 text-sm leading-7 text-zinc-400">
              Something went wrong. Please refresh the page or go back.
            </p>

            {import.meta.env.DEV && (
              <div className="mb-6 max-h-52 overflow-auto rounded-2xl border border-white/10 bg-black/35 p-4 text-left">
                <p className="mb-2 text-sm font-semibold text-red-400">
                  Error Details:
                </p>
                <p className="mb-4 break-words font-mono text-xs text-zinc-300">
                  {this.state.error?.toString()}
                </p>
                <p className="mb-2 text-sm font-semibold text-yellow-500">
                  Stack Trace:
                </p>
                <pre className="overflow-auto text-xs text-zinc-500">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-xl bg-yellow-500 py-3 font-bold text-black transition hover:bg-yellow-400"
              >
                Refresh Page
              </button>
              <button
                type="button"
                onClick={this.resetError}
                className="rounded-xl border border-white/10 bg-zinc-900 py-3 font-bold text-white transition hover:border-yellow-500/35"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
