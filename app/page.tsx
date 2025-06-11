import React from "react";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-8">
			<div className="space-y-8 w-full max-w-6xl">
				<div className="flex flex-col items-center justify-center text-center space-y-4">
					<div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full inline-flex items-center">
						<span className="text-sm">JigsawStack</span>
					</div>
					<h1 className="text-5xl font-bold">JigsawStack SDK Template</h1>
					<p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">
						Try our hand-picked small custom models. Available for free.
					</p>
					<div className="flex gap-4 mt-4">
						<button
							type="button"
							className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 px-5 py-3 rounded-full border border-zinc-200 dark:border-zinc-700"
						>
							Documentation
						</button>
					</div>
				</div>

				<div className="flex flex-wrap justify-center gap-4 text-sm mt-10">
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Default
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Red
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Rose
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Orange
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Green
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Blue
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Yellow
					</button>
					<button
						type="button"
						className="px-4 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
					>
						Violet
					</button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					<div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col">
						<h2 className="font-medium mb-2">Move Goal</h2>
						<p className="text-zinc-500 dark:text-zinc-400 text-sm">
							Set your daily activity goal.
						</p>

						<div className="flex items-center justify-center flex-grow">
							<div className="flex flex-col items-center mt-8">
								<div className="text-7xl font-semibold mb-1">350</div>
								<div className="text-zinc-500 text-xs uppercase">
									calories/day
								</div>

								<div className="flex items-center gap-4 mt-6">
									<button
										type="button"
										className="bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center"
									>
										<span>-</span>
									</button>
									<button
										type="button"
										className="bg-zinc-800 rounded-full w-8 h-8 flex items-center justify-center"
									>
										<span>+</span>
									</button>
								</div>
							</div>
						</div>

						<button
							type="button"
							className="bg-zinc-800 text-white rounded-md py-2 mt-4 hover:bg-zinc-700"
						>
							Set Goal
						</button>
					</div>

					<div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 flex flex-col">
						<h2 className="font-medium mb-2">Exercise Minutes</h2>
						<p className="text-zinc-500 dark:text-zinc-400 text-sm">
							Your exercise minutes are ahead of where you normally are.
						</p>

						<div className="flex-grow">
							{/* This area would typically have a chart */}
						</div>
					</div>
				</div>

				<div className="mt-10 text-center">
					<button
						type="button"
						className="bg-zinc-800 px-5 py-2 rounded-lg text-sm"
					>
						Copy Code
					</button>
				</div>
			</div>
		</div>
	);
}
