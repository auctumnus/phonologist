import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { parsePhoneme } from '../src'

test('basic vowel', () => {
  const parsed = parsePhoneme('a')
  assert.equal(parsed.features, ['open', 'front'])
  assert.equal(parsed.modifiers, [])
  assert.ok(parsed.isVowel)
  assert.ok(!parsed.isConsonant)
})

test('basic consonant', () => {
  const parsed = parsePhoneme('t')
  assert.equal(parsed.features, ['alveolar', 'stop'])
  assert.equal(parsed.modifiers, [])
  assert.ok(parsed.isConsonant)
  assert.ok(!parsed.isVowel)
})

test('diacritics', () => {
  const parsed = parsePhoneme('á')
  assert.ok(parsed.modifiers.length)
  assert.ok(parsed.modifiers.includes('high'))
  assert.ok(parsed)
})

test('nonsense', () => {
  assert.not.ok(parsePhoneme('skjdfnsldfbksjd'))
})

test('terrifying diacritics', () => {
  const parsed = parsePhoneme('ɣ̞ˤʵ') // google "Gooise R"
  assert.ok(parsed)
})

test('er', () => {
  const parsed = parsePhoneme('ɚ')
  assert.ok(parsed)
})

test('british er', () => {
  const parsed = parsePhoneme('ɝ')
  assert.ok(parsed)
})

test('prefixes', () => {
  const parsed = parsePhoneme('ᵐb')
  assert.ok(parsed.modifiers.includes('pre-nasalized'))
  assert.ok(parsed)
})

test('', () => {
  const parsed = parsePhoneme('m')
  assert.ok(parsed)
})

test.run()
