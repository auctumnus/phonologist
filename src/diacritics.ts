import diacriticsjson from './data/diacritics.json'
import { replaceAll } from './replaceAll'

const uniq = (arr: any[]) => {
  const unique: any[] = []
  arr.forEach((v) => (unique.includes(v) ? undefined : unique.push(v)))
  return unique
}

export type Modifier =
  | 'non-syllabic'
  | 'syllabic'
  | 'aspirated'
  | 'inaudible-release'
  | 'nasal-release'
  | 'pre-nasalized'
  | 'post-stopped'
  | 'dental-fricative-release'
  | 'lateral-release'
  | 'velar-fricative-release'
  | 'schwa-release'
  | 'voiceless'
  | 'voiced'
  | 'breathy'
  | 'creaky'
  | 'dental'
  | 'linguolabial'
  | 'apical'
  | 'laminal'
  | 'advanced'
  | 'retracted'
  | 'centralized'
  | 'mid-centralized'
  | 'raised'
  | 'lowered'
  | 'over-rounded'
  | 'under-rounded'
  | 'labialized'
  | 'palatalized'
  | 'velarized'
  | 'pharyngealized'
  | 'advanced-tongue-root'
  | 'retracted-tongue-root'
  | 'nasalized'
  | 'rhotacized'
  | 'long'
  | 'extra-high'
  | 'high'
  | 'mid'
  | 'low'
  | 'extra-low'
  | 'rising'
  | 'falling'
  | 'high-rising'
  | 'low-rising'
  | 'rising-falling'
  | 'half-long'
  | 'extra-short'

export const diacritics = diacriticsjson as Record<string, Modifier>

const postfixes = Object.keys(diacritics).filter(
  (d) => d.indexOf('◌') < d.indexOf(d.replace('◌', ''))
)

export const modifiers = uniq(Object.values(diacriticsjson)) as Modifier[]

const isPostfix = (diacritic: string) => postfixes.includes(diacritic)

const allDiacritics = RegExp(
  Object.keys(diacritics)
    .map((d) => d.replace('◌', ''))
    .join('|'),
  'g'
)

/**
 * Removes any recognized diacritics from a string.
 * @param s The string to remove diacritics from.
 * @returns The string without diacritics.
 */
export const removeDiacritics = (s: string) => {
  s = s.normalize('NFD')
  const cleaned = replaceAll(s, allDiacritics, '')
  if (cleaned === 'ɚ') {
    return 'ə'
  } else if (cleaned === 'ɝ') {
    return 'ɜ'
  } else {
    return cleaned
  }
}

/**
 * Finds modifiers that exist in this string.
 * @param s An IPA string.
 * @returns An array of modifier names
 */
export const findModifiers = (s: string) => {
  // decompose string
  s = s.normalize('NFD')
  const base = removeDiacritics(s)
  return uniq(
    Object.entries(diacritics)
      .filter(([diacritic, modifier]) => {
        let d = diacritic.replace('◌', '')
        // unicode should really decompose these, but i'm not on the board so
        return (
          (modifier === 'rhotacized' && (s === 'ɚ' || s === 'ɝ')) ||
          (isPostfix(diacritic) && s.indexOf(base) < s.indexOf(d)) ||
          (s.indexOf(d) !== -1 && s.indexOf(d) < s.indexOf(base))
        )
      })
      .map(([_, v]) => v)
  )
}
