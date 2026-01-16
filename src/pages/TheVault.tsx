import React, { useState } from 'react';
import SearchBar from '../components/vault/SearchBar';
import UploadModal from '../components/vault/UploadModal';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Image as ImageIcon, Link as LinkIcon, ArrowUp, Trash2, Lock, Globe } from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { Badge } from '@/components/ui/badge';

// Mock Data Type
export type Resource = {
    id: string;
    title: string;
    description: string;
    type: 'PDF' | 'Image' | 'Link';
    tags: string[];
    module?: string;
    url: string;
    thumbnail?: string;
    upvotes: number;
    visibility: 'Public' | 'Private';
    author: string;
    createdAt: string;
};

// Initial Mock Data
const INITIAL_RESOURCES: Resource[] = [
    {
        id: '1',
        title: 'Calculus II Cheat Sheet',
        description: 'A comprehensive cheat sheet for integrals and series.',
        type: 'PDF',
        tags: ['Math', 'Calculus', 'Cheat Sheet'],
        url: '#',
        upvotes: 24,
        visibility: 'Public',
        author: 'Arjun Sharma',
        createdAt: '2024-03-15',
    },
    {
        id: '2',
        title: 'Physics Mechanics Notes',
        description: 'Handwritten notes for classical mechanics modules.',
        type: 'Image',
        tags: ['Physics', 'Mechanics', 'Notes'],
        url: '#',
        upvotes: 12,
        visibility: 'Private',
        author: 'Arjun Sharma',
        createdAt: '2024-03-10',
    },
    {
        id: '3',
        title: 'React Hooks Guide',
        description: 'Official documentation link for React Hooks.',
        type: 'Link',
        tags: ['CS', 'React', 'Web Dev'],
        url: 'https://react.dev',
        upvotes: 56,
        visibility: 'Public',
        author: 'Arjun Sharma',
        createdAt: '2024-03-01',
    },
    {
        id: '4',
        title: 'Design System Principles',
        description: 'Guide to atomic design and reusable components.',
        type: 'PDF',
        tags: ['Design', 'UI/UX'],
        url: '#',
        upvotes: 89,
        visibility: 'Public',
        author: 'Sarah Lee',
        createdAt: '2024-03-20',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '5',
        title: 'Machine Learning Basics',
        description: 'Introductory slides for ML, covering regression and classification.',
        type: 'PDF',
        tags: ['AI', 'ML', 'Data Science'],
        url: '#',
        upvotes: 120,
        visibility: 'Public',
        author: 'David Chen',
        createdAt: '2024-03-22',
    },
    {
        id: '6',
        title: 'Web Accessibility Checklist',
        description: 'Ensure your sites are accessible to everyone.',
        type: 'Link',
        tags: ['Web', 'A11y'],
        url: '#',
        upvotes: 45,
        visibility: 'Public',
        author: 'Arjun Sharma',
        createdAt: '2024-03-25',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '7',
        title: 'Advanced CSS Tricks',
        description: 'Cool CSS effects and layouts.',
        type: 'Link',
        tags: ['CSS', 'Frontend'],
        url: '#',
        upvotes: 30,
        visibility: 'Public',
        author: 'Sarah Lee',
        createdAt: '2024-03-28',
    },
];

export default function TheVault() {
    const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<'All' | 'Tag' | 'Module'>('All');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Filter resources based on search query (title or tags)
    const filteredResources = resources.filter((res) => {
        const query = searchQuery.toLowerCase();

        if (filterType === 'Tag') {
            return res.tags.some(tag => tag.toLowerCase().includes(query));
        }
        if (filterType === 'Module') {
            return res.module?.toLowerCase().includes(query) ?? false;
        }

        // Default 'All' behavior
        return (
            res.title.toLowerCase().includes(query) ||
            res.tags.some(tag => tag.toLowerCase().includes(query)) ||
            (res.module?.toLowerCase().includes(query) ?? false)
        );
    });

    const handleUpload = (newResource: Resource) => {
        setResources([newResource, ...resources]);
        setIsUploadModalOpen(false);
    };

    const handleUpvote = (id: string) => {
        setResources(resources.map(res =>
            res.id === id ? { ...res, upvotes: res.upvotes + 1 } : res
        ));
    };

    const handleDelete = (id: string) => {
        // In a real app, confirm before delete
        setResources(resources.filter(res => res.id !== id));
    };

    return (
        <div className="flex flex-col h-full gap-6 p-2 md:p-6 bg-gray-50 dark:bg-neutral-900/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">The Vault</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Manage your documents, images, and links.</p>
                </div>
                <Button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Content
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="w-full">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    filterType={filterType}
                    onFilterChange={setFilterType}
                />
            </div>

            {/* Content Grid */}
            <BentoGrid>
                {filteredResources.map((resource, idx) => {
                    let IconComponent = FileText;
                    if (resource.type === 'Image') IconComponent = ImageIcon;
                    if (resource.type === 'Link') IconComponent = LinkIcon;

                    return (
                        <BentoCard
                            key={resource.id}
                            name={resource.title}
                            href={resource.url}
                            cta="Open Resource"
                            Icon={IconComponent}
                            header={
                                <div className="flex gap-2">
                                    <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full" title={resource.visibility}>
                                        {resource.visibility === 'Private' ? <Lock className="w-3 h-3 text-white" /> : <Globe className="w-3 h-3 text-white" />}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-neutral-500 hover:text-red-500 bg-white/50 hover:bg-white/80"
                                        onClick={(e) => { e.preventDefault(); handleDelete(resource.id); }}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            }
                            background={
                                resource.thumbnail && (
                                    <img
                                        src={resource.thumbnail}
                                        alt={resource.title}
                                        className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity group-hover:opacity-10"
                                    />
                                )
                            }
                            description={
                                <div className="flex flex-col gap-2 mt-2">
                                    <span className="line-clamp-2 text-sm">{resource.description}</span>
                                    <div className="flex flex-wrap gap-1">
                                        {resource.tags.slice(0, 3).map(tag => (
                                            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                                                #{tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center text-xs mt-1 text-neutral-400">
                                        <span>{resource.author}</span>
                                        <div
                                            className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-colors"
                                            onClick={(e) => { e.preventDefault(); handleUpvote(resource.id); }}
                                        >
                                            <ArrowUp className="w-3 h-3" />
                                            <span>{resource.upvotes}</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            className={
                                idx % 7 === 1 || idx % 7 === 5
                                    ? "md:col-span-2 lg:col-span-2"
                                    : ""
                            }
                        />
                    );
                })}
            </BentoGrid>

            {filteredResources.length === 0 && (
                <div className="text-center py-20 text-neutral-500">
                    No resources found. Try a different search key or upload new content.
                </div>
            )}

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    onUpload={handleUpload}
                />
            )}
        </div>
    );
}
