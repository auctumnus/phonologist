import { Feature, phonemes, isVowel, getFeatures } from './data'
import { removeDiacritics, findModifiers, Modifier } from './diacritics'

export interface Phoneme {
  /**
   * The IPA representation of this phoneme.
   */
  ipa: string

  /**
   * The base letter of this phoneme.
   */
  base: string

  /**
   * The feature list for this phoneme.
   */
  features: Feature[]
  /**
   * The modifier list for this phoneme.
   */
  modifiers: Modifier[]
  /**
   * Whether this phoneme is a vowel.
   */
  isVowel: boolean
  /**
   * Whether this phoneme is a consonant.
   */
  isConsonant: boolean
}

/**
 * Parses a phoneme into features and modifiers.
 * If it can't find the phoneme that this IPA represents, returns null.
 * @param ipa The IPA representation of the phoneme to be parsed.
 * @returns An object representing the phoneme.
 */
export const parsePhoneme = (ipa: string) => {
  const base = removeDiacritics(ipa)
  const vowel = isVowel(base)
  const features = getFeatures(base)
  if (!features.length) {
    return null
  }
  const modifiers = findModifiers(ipa)
  return Object.freeze({
    ipa,
    base,
    features,
    modifiers,
    isVowel: vowel,
    isConsonant: !vowel,
  }) as Phoneme
}
