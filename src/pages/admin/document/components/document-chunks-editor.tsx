import { useState } from "react"
import { IconEdit, IconTrash, IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { DocumentChunk, ChunkType } from "../edit-types"

interface DocumentChunksEditorProps {
  chunks: DocumentChunk[]
  onUpdateChunk: (chunkId: number, data: Partial<DocumentChunk>) => void
  onDeleteChunk: (chunkId: number) => void
}

export function DocumentChunksEditor({ chunks, onUpdateChunk, onDeleteChunk }: DocumentChunksEditorProps) {
  const [editingChunk, setEditingChunk] = useState<DocumentChunk | null>(null)
  const [expandedChunks, setExpandedChunks] = useState<Set<number>>(new Set())

  const toggleChunk = (chunkId: number) => {
    setExpandedChunks((prev) => {
      const next = new Set(prev)
      if (next.has(chunkId)) {
        next.delete(chunkId)
      } else {
        next.add(chunkId)
      }
      return next
    })
  }

  const handleSaveChunk = () => {
    if (editingChunk) {
      onUpdateChunk(editingChunk.id, editingChunk)
      setEditingChunk(null)
    }
  }

  const getChunkTypeColor = (type: ChunkType) => {
    switch (type) {
      case "title":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case "abstract":
        return "bg-purple-500/10 text-purple-700 border-purple-200"
      case "paragraph":
        return "bg-gray-500/10 text-gray-700 border-gray-200"
      case "table":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "reference":
        return "bg-orange-500/10 text-orange-700 border-orange-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Document Chunks ({chunks.length})</CardTitle>
          <CardDescription>
            View and edit document chunks extracted during processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {chunks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No chunks available for this document
            </div>
          ) : (
            chunks
              .sort((a, b) => a.chunk_index - b.chunk_index)
              .map((chunk) => (
                <Collapsible
                  key={chunk.id}
                  open={expandedChunks.has(chunk.id)}
                  onOpenChange={() => toggleChunk(chunk.id)}
                >
                  <div className="border rounded-lg">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                            {chunk.chunk_index}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-sm">
                              {chunk.section_title || `Chunk ${chunk.chunk_index}`}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {chunk.token_count ? `${chunk.token_count} tokens` : "Unknown tokens"}
                              {chunk.page_number && ` • Page ${chunk.page_number}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getChunkTypeColor(chunk.chunk_type)}>
                            {chunk.chunk_type}
                          </Badge>
                          {expandedChunks.has(chunk.id) ? (
                            <IconChevronUp className="size-5 text-muted-foreground" />
                          ) : (
                            <IconChevronDown className="size-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="border-t p-4 space-y-3 bg-muted/20">
                        <div>
                          <Label className="text-xs text-muted-foreground">Content</Label>
                          <div className="mt-1 text-sm whitespace-pre-wrap bg-background border rounded-md p-3 max-h-48 overflow-y-auto">
                            {chunk.content}
                          </div>
                        </div>

                        {chunk.possibly_questions && chunk.possibly_questions.length > 0 && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Possible Questions</Label>
                            <ul className="mt-1 space-y-1">
                              {chunk.possibly_questions.map((question, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                  <span>•</span>
                                  <span>{question}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingChunk(chunk)
                            }}
                          >
                            <IconEdit className="size-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (confirm("Are you sure you want to delete this chunk?")) {
                                onDeleteChunk(chunk.id)
                              }
                            }}
                          >
                            <IconTrash className="size-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))
          )}
        </CardContent>
      </Card>

      {/* Edit Chunk Dialog */}
      <Dialog open={!!editingChunk} onOpenChange={() => setEditingChunk(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Chunk {editingChunk?.chunk_index}</DialogTitle>
            <DialogDescription>
              Modify chunk content and metadata
            </DialogDescription>
          </DialogHeader>

          {editingChunk && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="chunk-content">Content</Label>
                <Textarea
                  id="chunk-content"
                  value={editingChunk.content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setEditingChunk({ ...editingChunk, content: e.target.value })
                  }
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chunk-type">Chunk Type</Label>
                  <Select
                    value={editingChunk.chunk_type}
                    onValueChange={(value) =>
                      setEditingChunk({ ...editingChunk, chunk_type: value as ChunkType })
                    }
                  >
                    <SelectTrigger id="chunk-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="paragraph">Paragraph</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="reference">Reference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="page-number">Page Number</Label>
                  <Input
                    id="page-number"
                    type="number"
                    value={editingChunk.page_number || ""}
                    onChange={(e) =>
                      setEditingChunk({
                        ...editingChunk,
                        page_number: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section-title">Section Title</Label>
                <Input
                  id="section-title"
                  value={editingChunk.section_title || ""}
                  onChange={(e) =>
                    setEditingChunk({ ...editingChunk, section_title: e.target.value || null })
                  }
                  placeholder="Optional section title"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingChunk(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChunk}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
