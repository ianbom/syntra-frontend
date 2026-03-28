import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DocumentDetail, DocumentType } from "../edit-types"

interface DocumentEditFormProps {
  document: DocumentDetail
  onUpdate: (data: Partial<DocumentDetail>) => void
}

export function DocumentEditForm({ document, onUpdate }: DocumentEditFormProps) {
  const [formData, setFormData] = useState<DocumentDetail>(document)

  const handleChange = (field: keyof DocumentDetail, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    onUpdate({ [field]: value })
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="dublin">Dublin Core</TabsTrigger>
        <TabsTrigger value="extended">Extended</TabsTrigger>
        <TabsTrigger value="status">Status</TabsTrigger>
      </TabsList>

      {/* Basic Information Tab */}
      <TabsContent value="basic" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential document information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("title", e.target.value)}
                placeholder="Document title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creator">Creator/Authors</Label>
              <Input
                id="creator"
                value={formData.creator || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("creator", e.target.value)}
                placeholder="Authors (comma-separated)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea
                id="abstract"
                value={formData.abstract || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("abstract", e.target.value)}
                placeholder="Document abstract"
                rows={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Document Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value as DocumentType)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("date", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Dublin Core Metadata Tab */}
      <TabsContent value="dublin" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dublin Core Metadata</CardTitle>
            <CardDescription>Standard metadata fields for academic resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords/Subject</Label>
              <Textarea
                id="keywords"
                value={formData.keywords || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("keywords", e.target.value)}
                placeholder="Keywords (comma-separated)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("description", e.target.value)}
                placeholder="Short description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  value={formData.publisher || ""}
                  onChange={(e) => handleChange("publisher", e.target.value)}
                  placeholder="Publisher name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contributor">Contributor</Label>
                <Input
                  id="contributor"
                  value={formData.contributor || ""}
                  onChange={(e) => handleChange("contributor", e.target.value)}
                  placeholder="Contributors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source || ""}
                  onChange={(e) => handleChange("source", e.target.value)}
                  placeholder="Journal/Conference name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={formData.language || ""}
                  onChange={(e) => handleChange("language", e.target.value)}
                  placeholder="e.g., en, id"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Input
                  id="format"
                  value={formData.format || ""}
                  onChange={(e) => handleChange("format", e.target.value)}
                  placeholder="MIME type or file format"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="identifier">Identifier</Label>
                <Input
                  id="identifier"
                  value={formData.identifier || ""}
                  onChange={(e) => handleChange("identifier", e.target.value)}
                  placeholder="Unique identifier"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relation">Relation</Label>
              <Input
                id="relation"
                value={formData.relation || ""}
                onChange={(e) => handleChange("relation", e.target.value)}
                placeholder="Related resources"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverage">Coverage</Label>
              <Input
                id="coverage"
                value={formData.coverage || ""}
                onChange={(e) => handleChange("coverage", e.target.value)}
                placeholder="Spatial/temporal coverage"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rights">Rights</Label>
              <Textarea
                id="rights"
                value={formData.rights || ""}
                onChange={(e) => handleChange("rights", e.target.value)}
                placeholder="Copyright information"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Extended Metadata Tab */}
      <TabsContent value="extended" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Extended Metadata</CardTitle>
            <CardDescription>Additional document information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doi">DOI</Label>
                <Input
                  id="doi"
                  value={formData.doi || ""}
                  onChange={(e) => handleChange("doi", e.target.value)}
                  placeholder="10.xxxx/xxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="citation_count">Citation Count</Label>
                <Input
                  id="citation_count"
                  type="number"
                  value={formData.citation_count}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("citation_count", parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file_path">File Path</Label>
              <Input
                id="file_path"
                value={formData.file_path || ""}
                onChange={(e) => handleChange("file_path", e.target.value)}
                placeholder="MinIO object name"
                disabled
              />
              <p className="text-xs text-muted-foreground">File path cannot be edited directly</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Status Tab */}
      <TabsContent value="status" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
            <CardDescription>Processing and visibility settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_private">Private Document</Label>
                <p className="text-sm text-muted-foreground">
                  Document is only visible to authorized users
                </p>
              </div>
              <Switch
                id="is_private"
                checked={formData.is_private}
                onCheckedChange={(checked: boolean) => handleChange("is_private", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_metadata_complete">Metadata Complete</Label>
                <p className="text-sm text-muted-foreground">
                  All required metadata fields are filled
                </p>
              </div>
              <Switch
                id="is_metadata_complete"
                checked={formData.is_metadata_complete}
                onCheckedChange={(checked: boolean) => handleChange("is_metadata_complete", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Processing Status</Label>
              <div className="rounded-md border p-3 bg-muted/50">
                <span className="font-medium capitalize">{formData.processing_status}</span>
              </div>
              <p className="text-xs text-muted-foreground">Processing status is automatically managed</p>
            </div>

            {formData.processing_error && (
              <div className="space-y-2">
                <Label>Processing Error</Label>
                <div className="rounded-md border p-3 bg-destructive/10 text-destructive text-sm">
                  {formData.processing_error}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Created At</Label>
                <div className="text-sm">{new Date(formData.created_at).toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Updated At</Label>
                <div className="text-sm">{new Date(formData.updated_at).toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
