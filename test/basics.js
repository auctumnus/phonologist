import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { parsePhoneme } from '../dist/phonologist.esm'

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
  console.log(parsed)
})

test('nonsense', () => {
  assert.not.ok(parsePhoneme('skjdfnsldfbksjd'))
})

test.run()
