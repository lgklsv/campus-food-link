export function Logo() {
  return (
    <span className="inline-flex shrink-0 items-center gap-0.5">
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        fill="none"
        className="size-10 shrink-0 text-primary"
      >
        <path
          d="M29.5 12.5a15.5 15.5 0 1 0 0 23"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M34 14v7a4 4 0 0 0 8 0v-7M38 14v22"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[15px] font-semibold leading-none tracking-[-0.035em]">
        <span className="block">Campus</span>
        <span className="block text-primary">Food Link</span>
      </span>
    </span>
  )
}
