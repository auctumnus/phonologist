import phonemesjson from './phonemes.json'

// significant data (and code to represent it) taken from https://seaming.github.io
// at permission from the author
export type Manner =
  | 'bilabial'
  | 'labiodental'
  | 'dental'
  | 'alveolar'
  | 'alveolopalatal'
  | 'retroflex'
  | 'palatal'
  | 'velar'
  | 'uvular'
  | 'pharyngeal'
  | 'glottal'

export type Place =
  | 'nasal'
  | 'stop'
  | 'affricate'
  | 'fricative'
  | 'trill-flap'
  | 'lateral-approximant'
  | 'approximant'

export type Height =
  | 'close'
  | 'near-close'
  | 'close-mid'
  | 'mid'
  | 'open-mid'
  | 'near-open'
  | 'open'

export type Depth = 'front' | 'near-front' | 'central' | 'near-back' | 'back'

export type ConsonantFeature = Manner | Place | 'voiced'
export type VowelFeature = Height | Depth | 'round'

export type Feature = ConsonantFeature | VowelFeature

export const poas = [
  'bilabial',
  'labiodental',
  'dental',
  'alveolar',
  'alveolopalatal',
  'retroflex',
  'palatal',
  'velar',
  'uvular',
  'pharyngeal',
  'glottal',
] as Feature[]
export const moas = [
  'nasal',
  'stop',
  'affricate',
  'fricative',
  'trill-flap',
  'lateral-approximant',
  'approximant',
] as Feature[]
export const heights = [
  'close',
  'near-close',
  'close-mid',
  'mid',
  'open-mid',
  'near-open',
  'open',
] as Feature[]

export const depths = [
  'front',
  'near-front',
  'central',
  'near-back',
  'back',
] as Feature[]

export const features = [...moas, ...poas, ...heights, ...depths, 'round']

export const phonemes = phonemesjson as Record<Feature, string[]>

export const getFeatures = (phoneme: string) =>
  features.filter((feature) => phonemes[feature].includes(phoneme))

export const isVowel = (s: string) => {
  const features = getFeatures(s)
  return heights.some((h) => features.includes(h))
}
