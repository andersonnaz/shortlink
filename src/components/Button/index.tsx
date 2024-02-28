import { ButtonHTMLAttributes, MouseEventHandler } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string
    onClick?: MouseEventHandler
}

export const Button: React.FC<ButtonProps> = ({ title, onClick}: ButtonProps) => {
    return (
        <button
            className="bg-[#144EE3] p-2 w-[178px] h-full rounded-full shadow-slate-800 shadow-md"
            onClick={onClick}
        >
            {title}
        </button>
    )
}