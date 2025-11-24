import { useSlate } from "slate-react";
import {toggleFormat, isFormatActive, FormatType} from '../../lib/slate/utils';

export default function Toolbar() {
    const editor = useSlate();

    return (
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">

            {/* Bold buttons */}
            <FormatButton format = "bold" icon="B" />

            <FormatButton format="italic" icon="I" />
            <FormatButton format="underline" icon="U" />

        </div>
    )
}

function FormatButton({format, icon}: {format: FormatType, icon:string}) {

    const editor = useSlate();
    const isActive = isFormatActive(editor, format);
    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();
        toggleFormat(editor, format);
    }

    return (
        <button
            onMouseDown={handleMouseDown}
            className={`
                px-3 py-1.5 rounded font-semibold transition-colors
                ${isActive ? 'bg-docs-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}
                `}
        >
            <span className={format === 'italic' ? 'italic' : ''}>
                {icon}
            </span>
        </button>
    )
}