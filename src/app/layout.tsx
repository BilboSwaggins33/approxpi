import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "About~Pi!",
	description: "Experimenting with ways to approximate pi!",
	icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="google-site-verification"
					content="nedmi8aBLWIFk29qAv76qO9ogzyKmYQxoITVilvX4XI"
				/>
			</head>
			<body className={inter.className}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
