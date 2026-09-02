export type Margins = {
  left: number
  top: number
  right: number
  bottom: number
}

export type Parameters = {
  inputPath: string
  outputPath: string
  margins: Margins
  page: {
    width: number
    height: number
  }
  ppi?: number
}

export type SplitImage = {
  src: PDFKit.Mixins.ImageSrc
  options: PDFKit.Mixins.ImageOption
}
