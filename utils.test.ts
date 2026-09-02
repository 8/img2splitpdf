import { test, expect } from 'vitest'
import { cm2dot, dot2inch, dot2px, inch2cm, inch2dot, px2dot } from './utils'

test('dot2inch', () => {
  expect(dot2inch(72)).toBe(1)
})

test('inch2dot', () => {
  expect(inch2dot(1)).toBe(72)
})

test('inch2cm', () => {
  expect(inch2cm(1)).toBe(2.54)
})

test('px2dot', () => {
  expect(px2dot(300, 72)).toBe(300)
})

test('dot2px', () => {
  expect(dot2px(300, 72)).toBe(300)
})

test('cm2dot', () => {
  console.log('cm2dot', cm2dot(21.0), cm2dot(29.7))
  expect(cm2dot(21.0)).toBeCloseTo(595.28)
  expect(cm2dot(29.7)).toBeCloseTo(841.89)
})

