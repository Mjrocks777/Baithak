import { FileText, Image as ImageIcon, Link as LinkIcon, Lock, Globe, ThumbsUp, Trash2, ExternalLink } from 'lucide-react';
import type { Resource } from '@/pages/TheVault';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
    resource: Resource;
    onUpvote: () => void;
    onDelete: () => void;
}

export default function ResourceCard({ resource, onUpvote, onDelete }: ResourceCardProps) {
    const getIcon = () => {
        switch (resource.type) {
            case 'PDF': return <FileText className="w-10 h-10 text-red-500" />;
            case 'Image': return <ImageIcon className="w-10 h-10 text-blue-500" />;
            case 'Link': return <LinkIcon className="w-10 h-10 text-green-500" />;
            default: return <FileText className="w-10 h-10" />;
        }
    };

    return (
        <div className="group relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Thumbnail / Icon Area */}
            <div className="h-32 bg-gray-100 dark:bg-neutral-900 flex items-center justify-center relative overflow-hidden">
                {resource.thumbnail ? (
                    <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="scale-100 group-hover:scale-110 transition-transform duration-300">
                        {getIcon()}
                    </div>
                )}

                {/* Visibility Badge */}
                <div className="absolute top-2 right-2">
                    {resource.visibility === 'Private' ? (
                        <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full" title="Private">
                            <Lock className="w-3 h-3 text-white" />
                        </div>
                    ) : (
                        <div className="bg-blue-500/80 backdrop-blur-sm p-1.5 rounded-full" title="Public">
                            <Globe className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-3">
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors" title={resource.title}>
                            {resource.title}
                        </h3>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 min-h-[2.5em]">
                        {resource.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-auto">
                    {resource.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                            #{tag}
                        </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">+{resource.tags.length - 3}</Badge>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-700 mt-2">
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                        <span>By {resource.author}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-neutral-500 hover:text-blue-600 gap-1"
                            onClick={(e) => { e.stopPropagation(); onUpvote(); }}
                        >
                            <ThumbsUp className="w-3 h-3" />
                            <span className="text-xs">{resource.upvotes}</span>
                        </Button>

                        {resource.type === 'Link' && (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500 hover:text-green-600">
                                    <ExternalLink className="w-3 h-3" />
                                </Button>
                            </a>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-neutral-500 hover:text-red-600"
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
