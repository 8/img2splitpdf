import { Margins, Parameters } from './types'
import { cm2dot } from './utils'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { basename} from 'path'

export const parseArgs = (argvWithoutBin: string[]) =>
  yargs(argvWithoutBin)
    .usage('Usage via files: $0 -i input.png -o output.pdf')
    .usage('Usage via pipes: $0 > out.pdf < in.png')
    .option('input', {
      alias: 'i',
      type: 'string',
      description: 'Path to input image file, use - for stdin',
      default: '-'
    })
    .option('output', {
      alias: 'o',
      type: 'string',
      description: 'Path to pdf output file, use - for stdout',
      default: '-'
    })
    .option('ppi', {
      type: 'number',
      description: 'Overrides the pixel per inch of the input image',
    })
    .parse()

export const getParameters = async () => {
  const args = await parseArgs(hideBin(process.argv))

  const inputPath = args.input
  const outputPath = args.output ?? `./${basename(inputPath)}.pdf`
  const ppi = args.ppi

  const margin_lr_cm = 1
  const margin_tb_cm = 1
  const margin_lr_dot = cm2dot(margin_lr_cm)
  const margin_tb_dot = cm2dot(margin_tb_cm)

  const margins: Margins = {
    left: margin_lr_dot,
    top: margin_tb_dot,
    right: margin_lr_dot,
    bottom: margin_tb_dot,
  }

  const p: Parameters = {
    inputPath,
    outputPath,
    margins,
    page: {
      // const a4Size = [ 595.28, 841.89 ]
      width: cm2dot(21.0),
      height: cm2dot(29.7),
    },
    ppi,
  }
  return p
}
