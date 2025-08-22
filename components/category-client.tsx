"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { RegistryItem } from "@/lib/registry";
import TagFilter from "@/components/tag-filter";
import { ExternalLinkIcon } from "lucide-react";

interface CategoryClientProps {
  categoryInfo: { name: string; label: string };
  allItems: RegistryItem[];
  availableTags: string[];
  selectedTags: string[];
  filteredItems: RegistryItem[];
}

function ComponentPreview({ item }: { item: RegistryItem }) {
  // Use explicit previewMode from registry metadata
  const needsIframe = item.meta.previewMode === "iframe";

  if (needsIframe) {
    return (
      <div className="w-full h-full relative">
        <iframe
          src={`/preview/${item.name}`}
          className="w-full h-full border-none"
        />
      </div>
    );
  }

  try {
    const componentPath = item.files[0].path.replace(".tsx", "");
    const Component = dynamic(() => import(`@/registry/${componentPath}`), {
      loading: () => (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse bg-muted rounded w-16 h-16"></div>
        </div>
      ),
      ssr: false,
    });

    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-muted overflow-hidden">
        <Component />
      </div>
    );
  } catch {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        <span className="text-sm">Preview unavailable</span>
      </div>
    );
  }
}

export default function CategoryClient({
  categoryInfo,
  availableTags,
  selectedTags,
  filteredItems,
}: CategoryClientProps) {
  return (
    <div className="flex">
      {/* Sidebar with tag filters */}
      <aside className="w-64 min-h-[calc(100vh-73px)] border-r bg-background p-4">
        <TagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          category={categoryInfo.name}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold capitalize mb-2">
            {categoryInfo.label}
          </h1>
          <p className="text-muted-foreground">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "component" : "components"}
            {selectedTags.length > 0 && (
              <span> matching: {selectedTags.join(", ")}</span>
            )}
          </p>
        </div>

        {/* Registry Grid */}
        {filteredItems.length > 0 ? (
          <div className="mx-auto max-w-screen-2xl">
            {filteredItems.map((item) => (
              <div key={item.name} className="group space-y-3 p-4">
                {/* Title and Description */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <Link
                      href={`/${categoryInfo.name}/${item.name}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                      title="Open full preview"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Live Component Preview */}
                <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-pulse bg-muted rounded w-16 h-16"></div>
                      </div>
                    }
                  >
                    <ComponentPreview item={item} />
                  </Suspense>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No components found matching the selected filters.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
