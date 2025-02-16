// components/ProductSkeleton.tsx
export default function ProductSkeleton() {
    return (
        <div className="card animate-pulse overflow-hidden">
            {/* Skeleton Image Area */}
            <div className="h-60 bg-platinumGray/20"></div>

            {/* Skeleton Text Area */}
            <div className="p-4">
                <div className="h-4 bg-platinumGray/30 w-3/4 mb-2 rounded"></div>
                <div className="h-3 bg-platinumGray/30 w-1/2 rounded"></div>
            </div>
        </div>
    );
}
