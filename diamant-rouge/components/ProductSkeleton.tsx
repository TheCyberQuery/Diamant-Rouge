// components/ProductSkeleton.tsx
export default function ProductSkeleton() {
    return (
        <div className="animate-pulse bg-ebony rounded-xl shadow-lg overflow-hidden">
            <div className="h-60 bg-gray-700"></div>
            <div className="p-4">
                <div className="h-4 bg-gray-600 w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 w-1/2"></div>
            </div>
        </div>
    );
}
