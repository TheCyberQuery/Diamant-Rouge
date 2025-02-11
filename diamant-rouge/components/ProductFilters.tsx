import { useState } from "react";

type ProductFiltersProps = {
    onSortChange: (sortOption: string) => void;
    onFilterChange?: (filterOption: string) => void;
};

export default function ProductFilters({ onSortChange, onFilterChange }: ProductFiltersProps) {
    const [sortOption, setSortOption] = useState("default");

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortOption(value);
        onSortChange(value);
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
            {/* Sorting Dropdown */}
            <div className="flex items-center">
                <label className="text-ivory mr-2 text-lg">Sort by:</label>
                <select
                    className="bg-ebony border border-gold text-ivory px-4 py-2 rounded-md focus:ring focus:ring-gold transition"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="latest">Newest Arrivals</option>
                </select>
            </div>

            {/* Future-proofed Filter Section */}
            {onFilterChange && (
                <div className="flex items-center">
                    <label className="text-ivory mr-2 text-lg">Filter:</label>
                    <select
                        className="bg-ebony border border-gold text-ivory px-4 py-2 rounded-md focus:ring focus:ring-gold transition"
                        onChange={(e) => onFilterChange(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="limited">Limited Edition</option>
                        <option value="bespoke">Bespoke Creations</option>
                    </select>
                </div>
            )}
        </div>
    );
}
