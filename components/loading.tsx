export const LoadingSpinner = () => (
  <div className="flex flex-col items-center py-8">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
    <p className="mt-4 text-sm text-zinc-500">Searching the web...</p>
  </div>
);
