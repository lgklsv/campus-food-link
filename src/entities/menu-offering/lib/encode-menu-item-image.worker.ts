import encoderUrl from "@jsquash/webp/codec/enc/webp_enc.wasm?url"
import simdEncoderUrl from "@jsquash/webp/codec/enc/webp_enc_simd.wasm?url"
import encode, { init } from "@jsquash/webp/encode.js"

self.onmessage = async (event: MessageEvent<ImageData>) => {
  try {
    await init({
      locateFile: (path: string) =>
        path.endsWith("webp_enc_simd.wasm") ? simdEncoderUrl : encoderUrl,
    })
    const bytes = await encode(event.data, { quality: 85 })
    self.postMessage(bytes, { transfer: [bytes] })
  } catch {
    self.postMessage({
      error: "Unable to convert the image to WebP. Please try again.",
    })
  }
}
