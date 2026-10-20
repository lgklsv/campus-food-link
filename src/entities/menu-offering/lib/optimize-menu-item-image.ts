const maxDimension = 640
let resizer: ReturnType<typeof import("pica").default> | undefined

export async function optimizeMenuItemImage(file: File): Promise<File> {
  const url = URL.createObjectURL(file)
  const image = new Image()
  const canvas = document.createElement("canvas")
  let worker: Worker | undefined

  try {
    image.src = url
    try {
      await image.decode()
    } catch {
      throw new Error(
        "Unable to read the image. Choose another JPEG, PNG or WebP image."
      )
    }

    const scale = Math.min(
      1,
      maxDimension / Math.max(image.naturalWidth, image.naturalHeight)
    )
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

    const { default: pica } = await import("pica")
    resizer ??= pica()
    await resizer.resize(image, canvas)

    const context = canvas.getContext("2d")
    if (!context)
      throw new Error("Unable to prepare the image. Please try again.")
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height)

    const encoder = new Worker(
      new URL("./encode-menu-item-image.worker.ts", import.meta.url),
      { type: "module" }
    )
    worker = encoder
    const bytes = await new Promise<ArrayBuffer>((resolve, reject) => {
      encoder.onmessage = (
        event: MessageEvent<ArrayBuffer | { error: string }>
      ) => {
        if (event.data instanceof ArrayBuffer) resolve(event.data)
        else reject(new Error(event.data.error))
      }
      encoder.onerror = () =>
        reject(new Error("Unable to optimize the image. Please try again."))
      encoder.onmessageerror = () =>
        reject(new Error("Unable to optimize the image. Please try again."))
      encoder.postMessage(pixels, [pixels.data.buffer])
    })

    return new File([bytes], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
      type: "image/webp",
    })
  } finally {
    worker?.terminate()
    URL.revokeObjectURL(url)
    image.src = ""
    canvas.width = 0
    canvas.height = 0
  }
}
