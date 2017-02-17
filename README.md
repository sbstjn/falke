# Kommissar Falke - [Download bei Amazon](https://www.amazon.de/dp/B01MT2XXF3/ref=pe_1604851_66412761_cm_rv_eml_rv0_dp)

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![license](https://img.shields.io/github/license/sbstjn/falke.svg)](https://github.com/sbstjn/falke)

Benutze dein Amazon Echo und frage Alexa wann der nächste Tatort läuft! Kommissar Falke weiß welche Folge als nächstes kommt und ob morgen oder übermorgen ein Tatort im Fernsehen kommt!

- Alexa, frage Kommissar Falke **wann der nächste Tatort läuft**
- Alexa, frage Kommissar Falke **ob heute Tatort läuft**

![Falke Tatort Amazon Echo Alex Skill](https://github.com/sbstjn/falke/raw/master/logo.png)

*Use your Amazon Echo and ask Alexa when the next episode of the German TV show [Tatort](http://www.daserste.de/unterhaltung/krimi/tatort/index.html) is broadcasted.*

## serverless

This application uses the [Serverless](https://serverless.com) toolkit to setup AWS.

```bash
$ > cd functions && npm install && cd ..
$ > APP_ID=amzn1.ask.skill.XYZ npm run deploy:prod
```

Kommissar Falke consists of two AWS lambda functions. One for crawling new air times and one for responding to Alexa requests.

### DynamoDB

The crawler stores all air times in a DynamoDB table.

```json
{
  "channel": "WDR",
  "date": "2017-02-16T19:15:00Z",
  "episode": "Schmuggler",
  "show": "tatort",
  "uuid": "2017-02-16T19:15:00Z@WDR"
}
```

## License

Feel free to use the code, it's released using the [MIT license](https://github.com/sbstjn/falke/blob/master/LICENSE.md).

## Contributors

- [Sebastian Müller](https://sbstjn.com)

## Dependencies

- [tatort](https://github.com/sbstjn/tatort)
