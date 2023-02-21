# Phonologist

A package for dealing with [phonemes] as written in the [International Phonetic Alphabet].

Currently, allows you to decompose a phoneme into its features.

## Installation

```sh
npm install phonologist
```

## Usage

```ts
import { parsePhoneme } from 'phonologist'

parsePhoneme('t')
// {
//   ipa: 't',
//   features: [ 'alveolar', 'stop' ],
//   modifiers: [],
//   isVowel: false,
//   isConsonant: true
// }
```

## To-do

1. better diacritic data
2. add modifiers to phonemes
3. more docs

[phonemes]: https://en.wikipedia.org/wiki/Phoneme
[international phonetic alphabet]: https://en.wikipedia.org/wiki/International_Phonetic_Alphabet
