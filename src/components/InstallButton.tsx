import { useEffect, useState } from "react"
import downloadIcon from "../svg/download.svg"
import SVG from "./SVG"

const InstallPWA = () => {
	const [supportsPWA, setSupportsPWA] = useState(false)
	const [promptInstall, setPromptInstall] = useState<null | any>(null)

	useEffect(() => {
		const handler = (e: any) => {
			e.preventDefault()
			setSupportsPWA(true)
			setPromptInstall(e)
		}
		window.addEventListener("beforeinstallprompt", handler)
		return () => window.removeEventListener("transitionend", handler)
	}, [])

	const onClick = (evt: any) => {
		evt.preventDefault()
		if (!promptInstall) return

		promptInstall.prompt()
	}

	if (!supportsPWA) return null

	return (
		<button
			className='flex items-center gap-[5px] fixed top-[20px] left-[20px] text-[14px] bg-[#f8f8f8] border border-c-purple text-c-purple rounded-[5px] p-[2px] z-40'
			aria-label='Install app'
			title='Install app'
			onClick={onClick}
		>
			<SVG path='download' fill='#7289da' w={20} h={20} className='p-[3px]' />
			<div>Download!</div>
		</button>
	)
}

export default InstallPWA
