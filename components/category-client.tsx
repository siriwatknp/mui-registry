"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { RegistryItem } from "@/lib/registry";
import TagFilter from "@/components/tag-filter";

interface CategoryClientProps {
  categoryInfo: { name: string; label: string };
  allItems: RegistryItem[];
  availableTags: string[];
  selectedTags: string[];
  filteredItems: RegistryItem[];
}

function ComponentPreview({ item }: { item: RegistryItem }) {
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
      <div className="w-full h-full flex items-center justify-center p-4 bg-background overflow-hidden">
        <div className="scale-75 origin-center">
          <Component />
        </div>
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
        <header className="mb-6">
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
        </header>

        {/* Registry Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.name}
                href={`/${categoryInfo.name}/${item.name}`}
                className="group block"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-md group-hover:border-foreground/20">
                  <CardContent className="p-0">
                    {/* Live Component Preview */}
                    <div className="aspect-video relative bg-muted rounded-t-lg overflow-hidden">
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

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.meta.tags && item.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.meta.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.meta.tags.length > 3 && (
                            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                              +{item.meta.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Type indicator */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground capitalize">
                          {item.type.replace("registry:", "")}
                        </span>
                        <div className="flex -space-x-1">
                          {item.dependencies.slice(0, 3).map((dep) => (
                            <div
                              key={dep}
                              className="w-6 h-6 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                              title={dep}
                            >
                              <span className="text-[10px] font-medium text-primary">
                                {dep.includes("mui")
                                  ? "M"
                                  : dep.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          ))}
                          {item.dependencies.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-[10px] font-medium text-muted-foreground">
                                +{item.dependencies.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
