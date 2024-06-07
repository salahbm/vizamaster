import { Roboto, Roboto_Mono, Space_Grotesk } from 'next/font/google'

export const roboto = Roboto({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
})

export const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto-mono',
})

export const grotesk = Space_Grotesk({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-grotesk',
})
