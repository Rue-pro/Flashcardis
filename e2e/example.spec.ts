import { expect, test } from '@playwright/test'

import { DICTIONARIES } from '@shared/entities/dictionary/model/dictionaries'
import { IDictionary } from '@shared/entities/dictionary/model/types'
import { TLanguageCode } from '@shared/entities/language'
import { INoteSelectors } from '@shared/entities/note'

const CONFIG: Record<
  Exclude<TLanguageCode, 'other'>,
  Record<
    string,
    {
      wordUrl: string
      variants: Record<string, INoteSelectors>
    }
  >
> = {
  en: {
    en_CambridgeDictionary: {
      wordUrl: 'https://dictionary.cambridge.org/dictionary/english/criterion',
      variants: {
        us: {
          text: 'criterion',
          transcription: '/kraɪˈtɪr.i.ən/',
          context:
            'The Health Service should not be judged by financial criteria alone.',
          translation:
            'a standard by which you judge, decide about, or deal with something:',
        },
        uk: {
          text: 'criterion',
          transcription: '/kraɪˈtɪə.ri.ən/',
          context:
            'The Health Service should not be judged by financial criteria alone.',
          translation:
            'a standard by which you judge, decide about, or deal with something:',
        },
      },
    },
    en_MerriamWebster: {
      wordUrl: 'https://www.merriam-webster.com/dictionary/hedge',
      variants: {
        common: {
          text: 'hedge',
          transcription: 'ˈhej',
          context:
            'pikemen … present a hedge of metal points from which any cavalry would flinch',
          translation:
            ': a fence or boundary formed by a dense row of shrubs or low trees',
        },
      },
    },
    en_Collins: {
      wordUrl: 'https://www.collinsdictionary.com/dictionary/english/criterion',
      variants: {
        us: {
          text: 'criterion',
          transcription: 'kraɪˈtɪriən',
          context:
            'The most important criterion for entry is that applicants must design and make their own work.',
          translation:
            'A criterion is a factor on which you judge or decide something.',
        },
        uk: {
          text: 'criterion',
          transcription: 'kraɪˈtɪərɪən',
          context:
            'The most important criterion for entry is that applicants must design and make their own work.',
          translation:
            'A criterion is a factor on which you judge or decide something.',
        },
      },
    },
    en_Wordreference: {
      wordUrl: 'https://www.wordreference.com/definition/criterion',
      variants: {
        us: {
          text: 'criterion',
          transcription: '/kraɪˈtɪriən/',
          context:
            'Which criterion is the most important when you grade essays?',
          translation: 'a standard by which something can be judged or decided',
        },
        uk: {
          text: 'criterion',
          transcription: '/kraɪˈtɪərɪən/',
          context:
            'Which criterion is the most important when you grade essays?',
          translation: 'a standard by which something can be judged or decided',
        },
      },
    },
  },
  ja: {
    ja_Jisho: {
      wordUrl: 'https://jisho.org/search/criterion',
      variants: {
        common: {
          text: 'きじゅん',
          transcription: '',
          context: `ひとつの
じゅうよう
重要な
さいよう
採用
きじゅん
基準に「リーダーシップ」があることは
まちが
間違いないです。`,
          translation:
            'standard; criterion; norm; benchmark; measure; gauge; basis',
        },
      },
    },
  },
  'pt-BR': {
    'pt-BR_Wordreference': {
      wordUrl: 'https://www.wordreference.com/enpt/criterion',
      variants: {
        common: {
          text: `criterion,
plural: criteria n`,
          transcription: '',
          context: '',
          translation: 'critério sm',
        },
      },
    },
  },
}

test('Should be test config for every variant of dictionary', () => {
  for (const [languageCode, language] of Object.entries(DICTIONARIES)) {
    if (languageCode === 'other') continue

    for (const dictionary of language['dictionaries']) {
      const languageTestConfig = CONFIG[languageCode]

      if (!languageTestConfig) {
        throw Error(`Can not find test config for language ${languageCode}`)
      }

      const dictionaryTestConfig = CONFIG[languageCode][dictionary.id]

      if (!dictionaryTestConfig) {
        throw Error(
          `Can not find test config for dictionary ${dictionary.id} and language ${languageCode}`,
        )
      }

      if ('variants' in dictionary) {
        for (const variant of dictionary.variants) {
          const dictionaryVariantTestConfig =
            dictionaryTestConfig.variants[variant.value]

          if (!dictionaryVariantTestConfig) {
            throw Error(
              `Can not find test config for variant ${variant.value} dictionary ${dictionary.id} and language ${languageCode}`,
            )
          }
        }
      } else {
        if (!dictionaryTestConfig.variants.common) {
          throw Error(
            `Can not find test config for variant common dictionary ${dictionary.id} and language ${languageCode}`,
          )
        }
      }
    }
  }
})

for (const [languageCode, language] of Object.entries(DICTIONARIES)) {
  if (languageCode === 'other') continue

  for (const dictionary of language['dictionaries']) {
    if ('variants' in dictionary) {
      for (const variant of dictionary.variants) {
        noteSelectorsTest({
          languageCode: languageCode as TLanguageCode,
          dictionary: {
            id: dictionary.id,
            variant: variant.value,
            selectors: variant.selectors,
          },
          wordUrl: CONFIG[languageCode as TLanguageCode][dictionary.id].wordUrl,
          testSelectorsResult:
            CONFIG[languageCode as TLanguageCode][dictionary.id].variants[
              variant.value
            ],
        })
      }
    } else {
      noteSelectorsTest({
        languageCode: languageCode as TLanguageCode,
        dictionary: {
          id: dictionary.id,
          variant: 'common',
          selectors: dictionary.selectors,
        },
        wordUrl: CONFIG[languageCode as TLanguageCode][dictionary.id].wordUrl,
        testSelectorsResult:
          CONFIG[languageCode as TLanguageCode][dictionary.id].variants.common,
      })
    }
  }
}

function noteSelectorsTest(props: {
  languageCode: TLanguageCode
  wordUrl: string
  dictionary: {
    variant: string
    id: IDictionary['id']
    selectors: INoteSelectors
  }
  testSelectorsResult: INoteSelectors
}) {
  test(`Should return autofilled word for language ${props.languageCode} dictionary ${props.dictionary.id} and variant ${props.dictionary.variant}`, async ({
    page,
  }) => {
    await page.goto(props.wordUrl, { waitUntil: 'domcontentloaded' })

    const text = await getText('text')
    expect(text).toBe(props.testSelectorsResult.text)

    const transcription = await getText('transcription')
    expect(transcription).toBe(props.testSelectorsResult.transcription)

    const translation = await getText('translation')
    expect(translation).toBe(props.testSelectorsResult.translation)

    const context = await getText('context')
    expect(context).toBe(props.testSelectorsResult.context)

    async function getText(selector: string) {
      if (!props.dictionary.selectors[selector]) return ''

      const selectorLocator = page.locator(props.dictionary.selectors[selector])
      const selectorTexts = await selectorLocator.allInnerTexts()

      return selectorTexts[0].trim()
    }
  })
}
