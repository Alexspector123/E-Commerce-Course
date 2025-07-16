export function SuggestionSkeleton({ count = 6 }) {
  return Array.from({ length: count }).map((_, idx) => (
    <div 
      key={idx} 
      className="
        border rounded 
        p-4 
        animate-pulse 
        space-y-4">
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  ));
}