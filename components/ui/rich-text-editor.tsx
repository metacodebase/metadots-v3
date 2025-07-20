"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import CodeBlock from '@tiptap/extension-code-block';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Button } from './button';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline as UnderlineIcon,
  Code,
  Palette,
  Highlighter,
  Table as TableIcon,
  Strikethrough,
  X,
  HelpCircle
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing...", editable = true }: RichTextEditorProps) {
  const { toast } = useToast();
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        validate: href => /^https?:\/\//.test(href),
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-md',
        },
        allowBase64: true,
        inline: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'bg-yellow-200 px-1 rounded',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300 w-full',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-300',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 font-semibold text-left p-2 border border-gray-300',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'p-2 border border-gray-300',
        },
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
    editorProps: {
      handlePaste: (view, event, slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find(item => item.type.startsWith('image/'));
        
        if (imageItem) {
          event.preventDefault();
          const file = imageItem.getAsFile();
          if (file) {
            handleImageUpload(file);
          }
          return true;
        }
        return false;
      },
      handleKeyDown: (view, event) => {
        // Handle Ctrl+K for adding links
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
          event.preventDefault();
          setShowLinkInput(true);
          return true;
        }
        return false;
      },
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/blogs/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Upload response:', data); // Debug log
        if (data.url && editor) {
          // Use base64 URL for immediate display, fallback to file path
          const imageUrl = data.url.startsWith('data:') ? data.url : data.filePath || data.url;
          console.log('Using image URL:', imageUrl); // Debug log
          editor.chain().focus().setImage({ src: imageUrl }).run();
          toast({
            title: "Success",
            description: "Image uploaded successfully!",
          });
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to upload image:', errorData.error);
        toast({
          title: "Upload Failed",
          description: errorData.error || "Failed to upload image",
          variant: "destructive",
        });
      }
          } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Upload Failed",
          description: "An error occurred while uploading the image. You can still add images via URL.",
          variant: "destructive",
        });
        // Show image URL input as fallback
        setShowImageInput(true);
      } finally {
        setIsUploading(false);
      }
    }, [editor, toast]);

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      if (editor.isActive('link')) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl('');
      setShowLinkInput(false);
      toast({
        title: "Link Added",
        description: "Link has been added successfully!",
      });
    }
  }, [linkUrl, editor, toast]);

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
      toast({
        title: "Image Added",
        description: "Image has been added successfully!",
      });
    }
  }, [imageUrl, editor, toast]);

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);

  const setTextColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  const setHighlight = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().toggleHighlight({ color }).run();
    }
  }, [editor]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  }, [handleImageUpload]);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        // Handle paste event for images
        navigator.clipboard.read().then((data) => {
          for (const item of data) {
            if (item.types.includes('image/png') || item.types.includes('image/jpeg') || item.types.includes('image/webp')) {
              item.getType('image/png').then((blob) => {
                const file = new File([blob], 'pasted-image.png', { type: 'image/png' });
                handleImageUpload(file);
              });
            }
          }
        }).catch(() => {
          // Fallback for older browsers or when clipboard API is not available
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleImageUpload]);

  if (!editor) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg overflow-hidden bg-white transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
      {/* Toolbar */}
      <div className="border-b p-3 flex flex-wrap gap-1 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button
            type="button"
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('strike') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists and Blocks */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button
            type="button"
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('codeBlock') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Links and Media */}
        <div className="flex items-center gap-1 border-r pr-2">
          <Button
            type="button"
            variant={editor.isActive('link') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          {editor.isActive('link') && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeLink}
              title="Remove Link"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowImageInput(!showImageInput)}
            title="Add Image URL"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
                e.target.value = '';
              }
            }}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            title="Upload Image"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              // Test with a sample image
              const testImageUrl = 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Test+Image';
              editor.chain().focus().setImage({ src: testImageUrl }).run();
              toast({
                title: "Test Image Added",
                description: "A test image has been added to the editor",
              });
            }}
            title="Add Test Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addTable}
            title="Add Table"
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1 border-r pr-2">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setTextColor('#000000')}
              title="Black"
              className="w-6 h-6 p-0 bg-black hover:bg-gray-800"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setTextColor('#3B82F6')}
              title="Blue"
              className="w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setTextColor('#EF4444')}
              title="Red"
              className="w-6 h-6 p-0 bg-red-500 hover:bg-red-600"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setTextColor('#10B981')}
              title="Green"
              className="w-6 h-6 p-0 bg-green-500 hover:bg-green-600"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setHighlight('#FEF3C7')}
            title="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </div>

        {/* History */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Help */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              toast({
                title: "Keyboard Shortcuts",
                description: (
                  <div className="text-sm space-y-1">
                    <div><strong>Ctrl+B:</strong> Bold</div>
                    <div><strong>Ctrl+I:</strong> Italic</div>
                    <div><strong>Ctrl+U:</strong> Underline</div>
                    <div><strong>Ctrl+K:</strong> Add Link</div>
                    <div><strong>Ctrl+V:</strong> Paste (including images)</div>
                    <div><strong>Ctrl+Z:</strong> Undo</div>
                    <div><strong>Ctrl+Y:</strong> Redo</div>
                  </div>
                ),
              });
            }}
            title="Keyboard Shortcuts"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="border-b p-3 bg-gray-50 flex gap-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && addLink()}
            autoFocus
          />
          <Button size="sm" onClick={addLink}>Add</Button>
          <Button size="sm" variant="outline" onClick={() => setShowLinkInput(false)}>Cancel</Button>
        </div>
      )}

      {/* Image Input */}
      {showImageInput && (
        <div className="border-b p-3 bg-gray-50 flex gap-2">
          <input
            type="url"
            placeholder="Enter image URL..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && addImage()}
            autoFocus
          />
          <Button size="sm" onClick={addImage}>Add</Button>
          <Button size="sm" variant="outline" onClick={() => setShowImageInput(false)}>Cancel</Button>
        </div>
      )}

      {/* Editor Content */}
      <div 
        className={`min-h-[300px] relative ${isDragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none p-4 focus:outline-none min-h-[300px]"
        />
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg border">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 font-medium">Uploading image...</p>
              <p className="text-xs text-gray-500 mt-1">Please wait</p>
            </div>
          </div>
        )}
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-50/80 flex items-center justify-center border-2 border-dashed border-blue-300 rounded-lg">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-600 font-medium">Drop image here to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t p-2 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span>💡 Tip: You can paste images directly from your clipboard (Ctrl+V / Cmd+V) or drag and drop images here</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Words: {editor.getText().split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>Characters: {editor.getText().length}</span>
        </div>
      </div>
    </div>
  );
} 