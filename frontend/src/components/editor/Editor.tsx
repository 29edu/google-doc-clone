import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { type Descendant } from "slate";
import { Slate, Editable, withReact, type RenderLeafProps } from "slate-react";
import { INITIAL_VALUE } from "../../lib/slate/config";
import Toolbar from "./Toolbar";
import { toggleFormat } from "../../lib/slate/utils";
import {
  saveDocumemt,
  loadDocument,
  loadTitle,
  loadLastSaved,
} from "../../lib/storage/storage";

export default function Editor() {
  const [title, setTitle] = useState<string>(() => loadTitle());
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(() => {
    const savedDoc = loadDocument();
    return savedDoc || INITIAL_VALUE;
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(() =>
    loadLastSaved()
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);

    // Save Title immediately
    saveDocumemt(value, newTitle);
    setLastSaved(new Date());
  };

  // Hnadle Keydown is for sortcut and this function runs everytime a key is pressed while the editor has focus
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // event.meta key is for mac and event.ctrlkKey is for windows
    const isModifierKey = event.ctrlKey || event.metaKey;
    if (!isModifierKey) {
      return;
    }

    switch (event.key) {
      case "b": {
        event.preventDefault(); // Stops browser defaults
        toggleFormat(editor, "bold");
        break;
      }

      case "i": {
        event.preventDefault();
        toggleFormat(editor, "italic");
        break;
      }

      case "u": {
        event.preventDefault();
        toggleFormat(editor, "underline");
        break;
      }
    }
  };

  // Auto save
  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    console.log(newValue);

    saveDocumemt(newValue, title);

    setLastSaved(new Date());
  };

  const renderLeaf = (props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;
    let content = children;
    if (leaf.bold) {
      content = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      content = <em>{children}</em>;
    }

    if (leaf.underline) {
      content = <u>{content}</u>;
    }

    return <span {...attributes}>{content}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-lg shadow-sm px-6 py-4 border-b">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-2xl font-semibold text-gray-800 w-full focus:outline-none border-none bg-transparent"
            placeholder="Untitled Document"
          />

          {/* Last saved Indicator */}
          <p className="text-sm text-gray-500  mt-1">
            Last Saved: {lastSaved?.toLocaleTimeString()}
          </p>
        </div>

        {/* Editor Container */}
        <div className="bg-white rounded-b-lg shadow-lg">
          {/* Slate*/}
          <Slate
            editor={editor}
            initialValue={value}
            onValueChange={handleChange}
          >
            <Toolbar />
            <Editable
              className="px-20 py-16 min-h-[600px] focus:outline-none text-base"
              placeholder="Start typing..."
              renderLeaf={renderLeaf}
              onKeyDown={handleKeyDown}
            />
          </Slate>
        </div>
      </div>
    </div>
  );
}

// Keydown event
