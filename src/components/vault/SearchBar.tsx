import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    filterType?: 'All' | 'Tag' | 'Module';
    onFilterChange?: (type: 'All' | 'Tag' | 'Module') => void;
}

export default function SearchBar({ value, onChange, filterType = 'All', onFilterChange }: SearchBarProps) {
    return (
        <div className="relative flex items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <Input
                    className="pl-10 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                    placeholder={`Search by ${filterType === 'All' ? 'title, tag, or module' : filterType.toLowerCase()}...`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <Filter className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onFilterChange?.('All')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFilterChange?.('Tag')}>Tags</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onFilterChange?.('Module')}>Module</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
