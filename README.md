<a href="https://github.com/jigsawstack/nextjs-template">
  <h1 align="center">JigsawStack Next.js Template</h1>
</a>

<p align="center">
  An open-source AI-powered starter kit built with Next.js, Tailwind CSS, and JigsawStack AI APIs.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#available-ai-apis"><strong>Available AI APIs</strong></a>
</p>
<br/>

## Features

- Ready-to-use AI API integrations powered by [JigsawStack](https://jigsawstack.com), including image generation, text-to-speech, speech-to-text, translation, OCR, and web search.
- Modern UI components using [shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com).
- Built with the latest [Next.js 15](https://nextjs.org) App Router and React 19.
- Turbopack for faster development experience.
- Dark mode support via next-themes.
- TypeScript for type safety.

## Deploy Your Own

You can deploy your own version to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjigsawstack%2Fnextjs-template&project-name=jigsawstack-nextjs-app&repository-name=jigsawstack-nextjs-app)

## Running Locally

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/jigsawstack/nextjs-template.git
   cd nextjs-template
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. Create a `.env.local` file in the root directory and add your JigsawStack API key:

   ```
   JIGSAWSTACK_API_KEY=your_api_key_here
   ```

   You can get your API key by signing up at [JigsawStack](https://jigsawstack.com).

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view your application.

## Available AI APIs

This template includes ready-to-use API routes for the following JigsawStack AI services:

- **Image Generation** - Create AI-generated images from text prompts
- **Text-to-Speech (TTS)** - Convert text to natural-sounding speech
- **Speech-to-Text** - Transcribe audio to text
- **Translation** - Translate text between languages
- **Visual OCR** - Extract text from images
- **AI Web Scraping** - Extract structured data from websites
- **Web Search** - Perform AI-powered web searches

Each API is pre-configured in the `app/api/jigsawstack` directory and ready to use in your Next.js application.

## Learn More

To learn more about the technologies used in this template:

- [JigsawStack Documentation](https://docs.jigsawstack.com) - learn about JigsawStack AI APIs
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - beautifully designed components

## License

This project is open source and available under the [MIT License](LICENSE).
