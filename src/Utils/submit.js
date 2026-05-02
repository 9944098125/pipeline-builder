import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useStore } from "../react-flow-store/store";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

const SUBMIT_BTN_CLASS =
	"appearance-none cursor-pointer rounded-full border-none bg-[linear-gradient(135deg,#c4c8ff_0%,#7c83fd_45%,#34d399_160%)] px-7 py-[0.65rem] font-inherit text-[0.95rem] font-semibold text-[#0b0f17] shadow-[0_4px_24px_rgba(124,131,253,0.35)] transition-[transform,box-shadow] duration-150 ease-in-out min-w-[min(100%,280px)] hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(124,131,253,0.45)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-[0.55] disabled:transform-none max-[768px]:w-[min(100%,360px)]";

const overlayClass =
	"fixed inset-0 z-[200] bg-[rgba(11,15,23,0.72)] backdrop-blur-[10px] data-[state=open]:animate-[fadeIn_160ms_ease-out]";

const contentClass =
	"fixed left-1/2 top-1/2 z-[201] w-[min(calc(100vw-2rem),640px)] max-h-[min(86vh,620px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[rgba(124,131,253,0.28)] bg-[#121826] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(124,131,253,0.08)_inset] outline-none data-[state=open]:animate-[dialogIn_200ms_ease-out]";

function SummaryRow({ label, value, valueClassName = "" }) {
	return (
		<div className="flex items-start justify-between gap-4 border-b border-[rgba(124,131,253,0.12)] py-3 last:border-b-0">
			<span className="shrink-0 text-[0.8rem] font-medium uppercase tracking-[0.06em] text-[#8b95ad]">
				{label}
			</span>
			<span
				className={`text-right text-[0.95rem] font-semibold text-[#e8ecf7] ${valueClassName}`}>
				{value}
			</span>
		</div>
	);
}

function DagBadge({ isDag }) {
	if (isDag) {
		return (
			<span className="inline-flex items-center rounded-full bg-[rgba(52,211,153,0.15)] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[#34d399] ring-1 ring-[rgba(52,211,153,0.35)]">
				DAG — no cycles
			</span>
		);
	}
	return (
		<span className="inline-flex items-center rounded-full bg-[rgba(251,113,133,0.12)] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[#fb7185] ring-1 ring-[rgba(251,113,133,0.35)]">
			Has a cycle
		</span>
	);
}

function StatCard({ label, value }) {
	return (
		<div className="rounded-lg border border-[rgba(124,131,253,0.16)] bg-[rgba(11,15,23,0.42)] px-4 py-3">
			<p className="m-0 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#8b95ad]">
				{label}
			</p>
			<p className="m-0 mt-1 text-[1.35rem] font-semibold leading-none text-[#e8ecf7]">
				{value}
			</p>
		</div>
	);
}

export const SubmitButton = () => {
	const [busy, setBusy] = useState(false);
	const [open, setOpen] = useState(false);
	const [variant, setVariant] = useState("success");
	const [parseResult, setParseResult] = useState(null);
	const [errorDetail, setErrorDetail] = useState("");

	const handleSubmit = async () => {
		const { nodes, edges } = useStore.getState();
		setBusy(true);
		try {
			const res = await fetch(`${API_BASE}/pipelines/parse`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ nodes, edges }),
			});
			const text = await res.text();
			let payload;
			try {
				payload = JSON.parse(text);
			} catch {
				throw new Error(text || `Server responded with status ${res.status}`);
			}
			if (!res.ok) {
				const detail = payload.detail ?? payload.message;
				const msg =
					typeof detail === "string"
						? detail
						: Array.isArray(detail)
							? detail
									.map((d) =>
										typeof d === "object" ? JSON.stringify(d) : String(d),
									)
									.join("; ")
							: detail != null
								? String(detail)
								: `Request failed (${res.status})`;
				throw new Error(msg);
			}
			setParseResult(payload);
			setErrorDetail("");
			setVariant("success");
			setOpen(true);
		} catch (err) {
			setParseResult(null);
			setErrorDetail(err.message || "Something went wrong.");
			setVariant("error");
			setOpen(true);
		} finally {
			setBusy(false);
		}
	};

	const handleOpenChange = (next) => {
		setOpen(next);
		if (!next) {
			setParseResult(null);
			setErrorDetail("");
		}
	};

	return (
		<>
			<style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dialogIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
			<div className="flex items-center justify-center bg-gradient-to-b from-[#121826] to-[#0b0f17] px-[clamp(0.85rem,3vw,1.25rem)] py-[clamp(0.8rem,2vw,1rem)] pb-[clamp(1rem,2.5vw,1.5rem)]">
				<button
					type="button"
					className={SUBMIT_BTN_CLASS}
					onClick={handleSubmit}
					disabled={busy}>
					{busy ? "Submitting…" : "Submit pipeline"}
				</button>
			</div>

			<Dialog.Root open={open} onOpenChange={handleOpenChange}>
				<Dialog.Portal>
					<Dialog.Overlay className={overlayClass} />
					<Dialog.Content className={contentClass}>
						<div className="border-b border-[rgba(124,131,253,0.18)] px-5 pb-4 pt-5 sm:px-6">
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0 flex-1">
									<p
										className={`m-0 mb-2 inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${
											variant === "success"
												? "bg-[rgba(52,211,153,0.15)] text-[#34d399] ring-1 ring-[rgba(52,211,153,0.3)]"
												: "bg-[rgba(251,113,133,0.14)] text-[#fb7185] ring-1 ring-[rgba(251,113,133,0.35)]"
										}`}>
										{variant === "success"
											? "Validation complete"
											: "Validation failed"}
									</p>
									<Dialog.Title className="m-0 text-lg font-semibold tracking-[-0.02em] text-[#e8ecf7]">
										{variant === "success"
											? "Submission received"
											: "Submission failed"}
									</Dialog.Title>
									<Dialog.Description className="mt-1.5 m-0 text-[0.875rem] leading-snug text-[#8b95ad]">
										{variant === "success"
											? "The server parsed your pipeline graph. Review the summary below."
											: "The pipeline could not be validated. Check the message and try again."}
									</Dialog.Description>
								</div>
								<Dialog.Close asChild>
									<button
										type="button"
										className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(124,131,253,0.22)] bg-[rgba(18,24,38,0.9)] text-[#c8cfdf] transition-colors hover:border-[rgba(124,131,253,0.4)] hover:bg-[rgba(124,131,253,0.12)] hover:text-[#e8ecf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c83fd]"
										aria-label="Close dialog">
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											aria-hidden="true">
											<path
												d="M6 6l12 12M18 6L6 18"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</Dialog.Close>
							</div>
						</div>

						<div className="px-5 py-4 sm:px-6">
							{variant === "success" && parseResult != null && (
								<div className="rounded-xl bg-[rgba(11,15,23,0.45)] px-4 py-4 ring-1 ring-[rgba(124,131,253,0.12)] sm:px-5">
									<p className="m-0 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#8b95ad]">
										Parse results
									</p>
									<p className="m-0 mt-2 text-[0.83rem] text-[#a8b0c4]">
										Graph parsed successfully. Here is a quick summary.
									</p>
									<div className="mt-4 grid grid-cols-2 gap-3">
										<StatCard label="Nodes" value={parseResult.num_nodes} />
										<StatCard label="Edges" value={parseResult.num_edges} />
									</div>
									<div className="mt-4 rounded-lg border border-[rgba(124,131,253,0.16)] bg-[rgba(11,15,23,0.42)] px-4 py-3">
										<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
											<span className="shrink-0 text-[0.74rem] font-semibold uppercase tracking-[0.09em] text-[#8b95ad]">
												Directed acyclic graph
											</span>
											<DagBadge isDag={parseResult.is_dag} />
										</div>
										<p className="m-0 mt-2 text-[0.82rem] leading-snug text-[#a8b0c4]">
											{parseResult.is_dag
												? "Execution order can be linearized topologically."
												: "Remove or rewrite edges that create a directed cycle."}
										</p>
									</div>
								</div>
							)}

							{variant === "error" && (
								<div className="rounded-xl bg-[rgba(251,113,133,0.08)] px-4 py-3 ring-1 ring-[rgba(251,113,133,0.22)]">
									<p className="m-0 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[#fb7185]">
										Error
									</p>
									<p className="mt-2 m-0 whitespace-pre-wrap font-mono text-[0.85rem] leading-relaxed text-[#e8ecf7]">
										{errorDetail}
									</p>
									<p className="mt-3 m-0 text-[0.8rem] leading-snug text-[#a8b0c4]">
										Confirm the API is running at{" "}
										<span className="font-mono text-[#c4c8ff]">{API_BASE}</span>
										.
									</p>
								</div>
							)}
						</div>

						<div className="flex flex-wrap items-center justify-end gap-2 border-t border-[rgba(124,131,253,0.12)] bg-[rgba(11,15,23,0.35)] px-5 py-4 sm:px-6">
							{variant === "error" && (
								<button
									type="button"
									onClick={handleSubmit}
									disabled={busy}
									className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[rgba(124,131,253,0.28)] bg-[rgba(18,24,38,0.9)] px-5 py-2.5 text-[0.84rem] font-semibold text-[#cfd5e6] transition-colors hover:border-[rgba(124,131,253,0.5)] hover:text-[#e8ecf7] disabled:cursor-not-allowed disabled:opacity-60">
									{busy ? "Retrying…" : "Retry submit"}
								</button>
							)}
							<Dialog.Close asChild>
								<button
									type="button"
									className="inline-flex cursor-pointer items-center justify-center rounded-full border-none bg-[linear-gradient(135deg,#c4c8ff_0%,#7c83fd_48%,#6d74e8_100%)] px-6 py-2.5 text-[0.875rem] font-semibold text-[#0b0f17] shadow-[0_4px_20px_rgba(124,131,253,0.3)] transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[0_8px_26px_rgba(124,131,253,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7c83fd]">
									Close
								</button>
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
};
