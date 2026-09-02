import fs from 'fs'
import PDFDocument from 'pdfkit'
import Sharp, { Region } from 'sharp'
import { dot2px } from './utils'
import { Parameters, SplitImage } from './types'
import { getParameters } from './parameters'

const main = async () => {
  await generatePdf(await getParameters())
}

type Input = string | Buffer

const getInput = async (input: string) => {
  let ret: Input

  if (input === '-') {
    const chunks = []
    for await (const chunk of process.stdin) {
      chunks.push(chunk)
    }
    ret = Buffer.concat(chunks)
  } else {
    ret = input
  }

  return ret satisfies Input
}

const generatePdf = async (p: Parameters) => {
  const doc = new PDFDocument({
    autoFirstPage: false,
  })

  const outputStream = p.outputPath === '-'
    ? process.stdout
    : fs.createWriteStream(p.outputPath)

  doc.pipe(outputStream)

  const a4Size = [p.page.width, p.page.height]

  const maxSize_dot = {
    width: a4Size[0] - (p.margins.left + p.margins.right),
    height: a4Size[1] - (p.margins.top + p.margins.bottom),
  }

  const input = await getInput(p.inputPath)
  const images = await splitImage(input, maxSize_dot, p.ppi)

  images.forEach((image) => {
    const pageOptions: PDFKit.PDFDocumentOptions = {
      margins: p.margins,
      size: a4Size,
    }
    doc.addPage(pageOptions)
    doc.image(image.src, image.options)
  })

  doc.end()
}

const splitImage = async (
  image: Input,
  maxSize_dot: {
    width: number
    height: number
  },
  ppiOverride?: number,
) => {
  const images: Array<SplitImage> = []

  const sharp = new Sharp(image)

  const metadata = await sharp.metadata()

  // console.log('metadata', metadata)
  const ppi = ppiOverride ?? metadata.density ?? 72
  // const ppi = 128

  const maxSize_px = {
    width: Math.floor(dot2px(maxSize_dot.width, ppi)),
    height: Math.floor(dot2px(maxSize_dot.height, ppi)),
  }

  const scale = 72 / ppi

  const cols = Math.ceil(metadata.width / maxSize_px.width)
  const rows = Math.ceil(metadata.height / maxSize_px.height)

  const regions: Array<Region> = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const left = col * maxSize_px.width
      const top = row * maxSize_px.height

      const region: Region = {
        left,
        width: Math.min(maxSize_px.width, metadata.width - left),
        top,
        height: Math.min(maxSize_px.height, metadata.height - top),
      }
      regions.push(region)
    }
  }

  for (let i = 0; i < regions.length; i++) {
    const s = sharp.clone().extract(regions[i])
    const buffer = await s.toBuffer()
    images.push({
      src: buffer,
      options: {
        scale,
      },
    })
  }

  return images
}

await main()
