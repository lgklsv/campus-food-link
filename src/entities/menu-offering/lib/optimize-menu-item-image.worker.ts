import jpegDecoderUrl from "@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm?url"
import decodeJpeg, { init as initJpeg } from "@jsquash/jpeg/decode.js"
import pngDecoderUrl from "@jsquash/png/codec/pkg/squoosh_png_bg.wasm?url"
import decodePng, { init as initPng } from "@jsquash/png/decode.js"
import resize, { initResize } from "@jsquash/resize"
import resizerUrl from "@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm?url"
import webpDecoderUrl from "@jsquash/webp/codec/dec/webp_dec.wasm?url"
import encoderUrl from "@jsquash/webp/codec/enc/webp_enc.wasm?url"
import simdEncoderUrl from "@jsquash/webp/codec/enc/webp_enc_simd.wasm?url"
import decodeWebp, { init as initWebp } from "@jsquash/webp/decode.js"
import encode, { init as initEncoder } from "@jsquash/webp/encode.js"

const maxDimension = 640

// Decode file bytes directly: Canvas readback can be blocked or altered by
// fingerprinting protection, including inside a Web Worker.
async function decodeImage(file: File): Promise<ImageData> {
  const bytes = await file.arrayBuffer()
  switch (file.type) {
    case "image/jpeg":
      await initJpeg({ locateFile: () => jpegDecoderUrl })
      return decodeJpeg(bytes, { preserveOrientation: true })
    case "image/png":
      await initPng(pngDecoderUrl)
      return decodePng(bytes)
    case "image/webp":
      await initWebp({ locateFile: () => webpDecoderUrl })
      return decodeWebp(bytes)
    default:
      throw new Error("Unsupported image format.")
  }
}

self.onmessage = async (event: MessageEvent<File>) => {
  try {
    let pixels = await decodeImage(event.data)
    const scale = Math.min(
      1,
      maxDimension / Math.max(pixels.width, pixels.height)
    )
    if (scale < 1) {
      await initResize(resizerUrl)
      pixels = await resize(pixels, {
        width: Math.max(1, Math.round(pixels.width * scale)),
        height: Math.max(1, Math.round(pixels.height * scale)),
        method: "lanczos3",
        premultiply: true,
        linearRGB: true,
      })
    }

    await initEncoder({
      locateFile: (path: string) =>
        path.endsWith("webp_enc_simd.wasm") ? simdEncoderUrl : encoderUrl,
    })
    const bytes = await encode(pixels, { quality: 85 })
    self.postMessage(bytes, { transfer: [bytes] })
  } catch {
    self.postMessage({
      error:
        "Unable to optimize the image. Choose another JPEG, PNG or WebP image, or try again.",
    })
  }
}
