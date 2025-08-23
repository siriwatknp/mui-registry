"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import { RegistryItem } from "@/lib/registry";
import TagFilter from "@/components/tag-filter";
import { ExternalLinkIcon, Copy, Check } from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { ImperativePanelHandle } from "react-resizable-panels";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";

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
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<{
    Component: React.ComponentType<SyntaxHighlighterProps>;
  } | null>(null);
  const panelRef = useRef<ImperativePanelHandle | null>(null);

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const handleDoubleClick = () => {
    if (panelRef.current) {
      panelRef.current.resize(100);
    }
  };

  const handleTabChange = async (value: string) => {
    setActiveTab(value);

    // Dynamically import syntax highlighter when code tab is first accessed
    if (value === "code" && !SyntaxHighlighter) {
      try {
        const syntaxHighlighterModule = (await import(
          "react-syntax-highlighter"
        )) as { Prism: React.ComponentType<SyntaxHighlighterProps> };
        setSyntaxHighlighter({
          Component: syntaxHighlighterModule.Prism,
        });
      } catch (error) {
        console.error("Failed to load syntax highlighter:", error);
        // Set a fallback to prevent infinite loading
        setSyntaxHighlighter(() => null);
      }
    }
  };

  const renderPreview = () => {
    const content = needsIframe ? (
      <div className="w-full h-full relative">
        <iframe
          src={`/preview/${item.name}`}
          className="aspect-video border-none min-h-[80vh] max-w-full"
        />
      </div>
    ) : (
      (() => {
        try {
          const componentPath = item.files[0].path.replace(".tsx", "");
          const Component = dynamic(
            () => import(`@/registry/${componentPath}`),
            {
              loading: () => (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-pulse bg-muted rounded w-16 h-16"></div>
                </div>
              ),
              ssr: false,
            }
          );

          return (
            <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
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
      })()
    );

    return (
      <ResizablePanelGroup direction="horizontal" className="w-full h-full">
        <ResizablePanel ref={panelRef} defaultSize={100} minSize={30}>
          {content}
        </ResizablePanel>
        <ResizableHandle withHandle onDoubleClick={handleDoubleClick} />
        <ResizablePanel defaultSize={0} minSize={0} maxSize={70} />
      </ResizablePanelGroup>
    );
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full h-full"
    >
      <div className="flex justify-between items-center mb-2">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value="preview"
        className="h-full mt-0 bg-muted border rounded-lg overflow-hidden"
      >
        {renderPreview()}
      </TabsContent>

      <TabsContent
        value="code"
        className="h-full mt-0 border rounded-lg overflow-hidden"
      >
        {item.files.map((file, index) => (
          <div
            key={file.path}
            className={
              needsIframe ? "aspect-video max-w-full min-h-[80vh]" : "h-[400px]"
            }
          >
            <div className="flex items-center justify-between bg-muted px-3 py-2 text-sm">
              <span className="font-mono">{file.path}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(file.content, index)}
                className="h-6 px-2"
              >
                {copiedIndex === index ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <div className="h-[calc(100%-40px)] overflow-auto">
              {activeTab === "code" ? (
                SyntaxHighlighter ? (
                  <SyntaxHighlighter.Component
                    language={
                      file.path.endsWith(".tsx") || file.path.endsWith(".ts")
                        ? "tsx"
                        : "jsx"
                    }
                    customStyle={{
                      margin: 0,
                      padding: "16px",
                      fontSize: "12px",
                      backgroundColor: "var(--background)",
                    }}
                    showLineNumbers
                  >
                    {file.content}
                  </SyntaxHighlighter.Component>
                ) : SyntaxHighlighter === null ? (
                  <pre className="p-4 text-xs bg-background">
                    <code>{file.content}</code>
                  </pre>
                ) : (
                  <div className="p-4 text-xs bg-background flex items-center justify-center">
                    <div className="animate-pulse">
                      Loading syntax highlighter...
                    </div>
                  </div>
                )
              ) : (
                <pre className="p-4 text-xs bg-background">
                  <code>{file.content}</code>
                </pre>
              )}
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}

export default function CategoryClient({
  categoryInfo,
  availableTags,
  selectedTags,
  filteredItems,
}: CategoryClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-10">
      {/* Header */}
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold capitalize mb-2">
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

      {/* Sticky Tag Filter */}
      <div className="sticky top-[57px] bg-background/80 backdrop-blur-sm py-4 mb-8 z-20">
        <TagFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          category={categoryInfo.name}
        />
      </div>

      {/* Registry Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid gap-8">
          {filteredItems.map((item) => (
            <div key={item.name} className="min-w-0 flex flex-col space-y-3">
              {/* Title and Description */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <Link
                    href={`/preview/${item.name}`}
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
              <div className="min-h-[360px]">
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
    </div>
  );
}
