export async function optimizeMenuItemImage(file: File): Promise<File> {
  const worker = new Worker(
    new URL("./optimize-menu-item-image.worker.ts", import.meta.url),
    { type: "module" }
  )

  try {
    const bytes = await new Promise<ArrayBuffer>((resolve, reject) => {
      worker.onmessage = (
        event: MessageEvent<ArrayBuffer | { error: string }>
      ) => {
        if (event.data instanceof ArrayBuffer) resolve(event.data)
        else reject(new Error(event.data.error))
      }
      worker.onerror = () =>
        reject(new Error("Unable to optimize the image. Please try again."))
      worker.onmessageerror = () =>
        reject(new Error("Unable to optimize the image. Please try again."))
      worker.postMessage(file)
    })

    return new File([bytes], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
      type: "image/webp",
    })
  } finally {
    worker.terminate()
  }
}
