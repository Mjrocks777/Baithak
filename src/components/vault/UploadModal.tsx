import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Resource } from '@/pages/TheVault';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (resource: Resource) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'PDF' | 'Image' | 'Link'>('PDF');
    const [visibility, setVisibility] = useState<'Public' | 'Private'>('Public');
    const [tags, setTags] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newResource: Resource = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description,
            type,
            visibility,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            url: url || '#',
            upvotes: 0,
            author: 'Arjun Sharma', // Mock user
            createdAt: new Date().toISOString(),
        };
        onUpload(newResource);
        // Reset form
        setTitle('');
        setDescription('');
        setTags('');
        setUrl('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Upload to Vault</DialogTitle>
                    <DialogDescription>
                        Add a new resource to your personal or public vault.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Type</Label>
                            <Select onValueChange={(val: any) => setType(val)} defaultValue={type}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PDF">PDF</SelectItem>
                                    <SelectItem value="Image">Image</SelectItem>
                                    <SelectItem value="Link">Link</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Visibility</Label>
                            <RadioGroup defaultValue="Public" onValueChange={(val: any) => setVisibility(val)} className="flex items-center space-x-2 mt-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Public" id="r1" />
                                    <Label htmlFor="r1">Public</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Private" id="r2" />
                                    <Label htmlFor="r2">Private</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Calculus Notes" required />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the resource..." />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="url">
                            {type === 'Link' ? 'URL' : 'File (Mock URL)'}
                        </Label>
                        <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder={type === 'Link' ? "https://..." : "File upload simulations..."} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="math, physics, notes (comma separated)" />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit">Upload</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
