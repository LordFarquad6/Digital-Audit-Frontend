require('dotenv').config()
const path = require('path')
const fs = require('fs')
const axios = require('axios')

const args = process.argv.slice(2)

if (!process.env.DEEPL_KEY) {
  throw new Error('Missing DeepL key. Add DEEPL_KEY to .env file')
}

;(async () => {
  const namespacesPath = path.join(__dirname, '..', 'public', 'locales')
  let namespaces = []
  let addedKeys = 0
  let keysAddedToNamespace = 0

  if (args.length) {
    namespaces.push(args[0])
  } else {
    namespaces = fs
      .readdirSync(path.join(namespacesPath, 'pl'))
      .map(file => file.split('.')[0])
  }

  console.log(`Found ${namespaces.length} namespaces`)

  const languages = fs
    .readdirSync(namespacesPath)
    .filter(file => fs.statSync(path.join(namespacesPath, file)).isDirectory())

  console.log(`Found ${languages.length} languages`)

  for (const namespace of namespaces) {
    keysAddedToNamespace = 0
    console.log(`Verifying ${namespace} namespace...`, '')
    const translations = {}
    const allTranslations = {}

    for (const language of languages) {
      if (
        fs.existsSync(path.join(namespacesPath, language, `${namespace}.json`))
      ) {
        const fileContent = fs.readFileSync(
          path.join(namespacesPath, language, `${namespace}.json`),
          'utf-8',
        )
        translations[language] = fileContent?.length
          ? JSON.parse(fileContent)
          : {}
      } else {
        fs.writeFileSync(
          path.join(namespacesPath, language, `${namespace}.json`),
          '{}',
        )
        translations[language] = {}
      }
      Object.assign(allTranslations, translations[language])
    }

    for (const [key, value] of Object.entries(allTranslations)) {
      for (const language of languages) {
        if (!(key in translations[language])) {
          console.log(
            `Missing ${namespace}:${key} in ${language} language. Adding...`,
          )
          try {
            const response = await axios({
              method: 'POST',
              url: 'https://api-free.deepl.com/v2/translate',
              data: {
                text: [value],
                target_lang: language,
              },
              headers: {
                'Content-Type': 'application/json',
                Authorization: `DeepL-Auth-Key ${process.env.DEEPL_KEY}`,
              },
            })
            translations[language][key] = response.data.translations[0].text
            addedKeys++
            keysAddedToNamespace++
          } catch (error) {
            console.warn(
              `Error while translating "${value}" to ${language} language. Skipping...`,
            )
          }
        }
      }
    }

    if (keysAddedToNamespace > 0) {
      for (const language of languages) {
        fs.writeFileSync(
          path.join(namespacesPath, language, `${namespace}.json`),
          JSON.stringify(
            translations[language],
            Object.keys(translations[language]).sort(),
            2,
          ),
        )
      }

      console.log(
        `Added ${keysAddedToNamespace} keys to ${namespace} namespace`,
      )
    }
  }

  if (addedKeys) {
    console.log(`Added ${addedKeys} keys in total`)
  } else {
    console.log('Translation files are up to date')
  }
})()
