import { PipelineToolbar } from './Utils/toolbar';
import { PipelineUI } from './Utils/ui';
import { SubmitButton } from './Utils/submit';

function App() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#0b0f17] [background-image:radial-gradient(1200px_600px_at_10%_-10%,#7c83fd2e,transparent),radial-gradient(900px_500px_at_100%_0%,#34d3991f,transparent)] font-sans text-[#e8ecf7]">
      <header className="border-b border-[rgba(124,131,253,0.22)] bg-[rgba(18,24,38,0.85)] px-[clamp(0.85rem,3vw,1.5rem)] pb-[clamp(0.45rem,1.5vw,0.5rem)] pt-[clamp(0.75rem,2vw,1rem)] backdrop-blur-[12px]">
        <h1 className="m-0 text-[clamp(1.05rem,2.4vw,1.35rem)] font-[650] tracking-[-0.02em]">
          Pipeline builder
        </h1>
        <p className="m-0 mt-1 text-[clamp(0.76rem,1.6vw,0.875rem)] text-[#8b95ad] max-[560px]:mt-0.5">
          Compose nodes, connect handles, and submit to validate graph structure.
        </p>
      </header>
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
