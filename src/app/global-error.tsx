"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#fafaf7] grid place-items-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#0f2d4a] mb-2">Something went wrong</h1>
          <p className="text-[#5a5a5a] mb-4">An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-[#0f2d4a] text-[#fafaf7] rounded-md"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
