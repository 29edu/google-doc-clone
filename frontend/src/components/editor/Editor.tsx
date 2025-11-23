import React, {useState, useMemo} from "react";
import { createEditor } from "slate";
import { Descendant } from "slate";
import type { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import { INITIAL_VALUE } from "../../lib/slate/config";


export default function Editor() {
    
    const editor = useMemo(() => withReact(createEditor()), []);

    const [value, setValue] = useState<Descendant[]>(INITIAL_VALUE);

    const handleChange = (newValue: Descendant[]) =>{
        setValue(newValue);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-sm px-6 py-4 border-b">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Untitled Document
                    </h1>
                </div>

                {/* Editor Container */}
                <div className="bg-white rounded-b-lg shadow-lg">
                    
                    {/* Slate*/}
                    <Slate
                        editor={editor}
                        initialValue={INITIAL_VALUE}
                        onValueChange={handleChange}
                    >
                        <Editable 
                            className="px-20 py-16 min-h-[600px] focus:outline-none text-base"
                            placeholder="Start typing..."
                        />
                    </Slate>
                </div>
            </div>
        </div>
    )
}