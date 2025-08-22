'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  category: string;
}

export default function TagFilter({ availableTags, selectedTags, category }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    const params = new URLSearchParams(searchParams);
    
    if (newSelectedTags.length > 0) {
      params.set('tags', newSelectedTags.join(','));
    } else {
      params.delete('tags');
    }

    const search = params.toString();
    router.push(`/${category}${search ? `?${search}` : ''}`);
  };

  const clearAllTags = () => {
    router.push(`/${category}`);
  };

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllTags}
            className="text-xs h-auto p-1"
          >
            Clear all
          </Button>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Selected:</p>
          <div className="space-y-1">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="w-full justify-between cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors block"
                onClick={() => toggleTag(tag)}
              >
                <span>{tag}</span>
                <span>×</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Available tags:</p>
        <div className="space-y-1">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "secondary"}
                className={cn(
                  "w-full justify-start cursor-pointer transition-colors block",
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "hover:bg-secondary/80"
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            {availableTags.length} tag{availableTags.length !== 1 ? 's' : ''} available
          </p>
        </div>
      )}
    </div>
  );
}