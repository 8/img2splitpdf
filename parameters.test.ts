import { test, expect, describe } from 'vitest'
import { parseArgs } from './parameters'

describe('parseArgs', () => {

  test('input output', async () => {
    const result = await parseArgs(['-i', 'input.png', '-o', 'output.pdf'])
    expect(result.input).toBe('input.png')
    expect(result.output).toBe('output.pdf')
  })

  test('ppi', async () => {
    const result = await parseArgs(['--ppi', '128'])
    expect(result.ppi).toBe(128)
  })
})