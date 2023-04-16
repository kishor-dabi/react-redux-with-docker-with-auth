import { SVGProps } from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom'

type IconProps = { Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element, label: string; linkTo: string, end?: boolean, disabled?: boolean }
export const SidebarIcon = ({ Icon, label, linkTo, end = false, disabled }: IconProps) => {

    return (
        <CustomLink disabled={disabled} to={linkTo} end={end}>
            <div className="w-6 h-6 md:w-8 md:h-8 mx-auto group-hover:text-white">
                <Icon/>
            </div>
            <span className="block text-center text-xs capitalize w-full">
                {label}
            </span>
        </CustomLink>
    )
}

interface CustomLinkProp extends LinkProps {
    end? :boolean
    disabled?: boolean
}
export const CustomLink = ({ children, to, end = false, disabled, ...props }: CustomLinkProp) => {
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: end })

    const baseStyle = `w-full h-auto py-3 cursor-pointer  hover:text-blue-700 transition-all duration-400 ease-out`
    const disabledStyle = `w-full h-auto py-3 cursor-default text-gray-400 dark:text-gray-600 pointer-events-none select-none`
    return (
        <Link
            className={
                disabled ? disabledStyle :
                `${baseStyle} ${
                match
                    ? ' bg-slate-100 dark:bg-[#1e3877] text-blue-700 dark:text-blue-300 hover:text-blue-700 scale-100 border-b-2 border-b-blue-700'
                    : 'text-slate-800  dark:text-gray-400 scale-90 dark:hover:text-blue-500'
            }`}
            to={to}
            {...props}
        >
            {children}
        </Link>
        /*{match && " (active)"}*/
    )
}
