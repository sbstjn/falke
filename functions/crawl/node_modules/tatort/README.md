# Tatort [![CircleCI](https://circleci.com/gh/sbstjn/tatort.svg?style=svg)](https://circleci.com/gh/sbstjn/tatort)

Query for upcoming [Tatort](http://www.daserste.de/unterhaltung/krimi/tatort/index.html) shows.

## Installation

```bash
$ > npm install tatort
```

## Usage

```bash
let Tatort = require('tatort');
let t = new Tatort('tvdirekt'); // Use TVDirekt as data source

t.next().then(
  (item) => {
    console.log(item.name, item.date, item.channel);
  }
);
```

## License

Feel free to use the code, it's released using the [MIT license](https://github.com/sbstjn/tatort/blob/master/LICENSE.md).

## Contributors

- [Sebastian Müller](https://sbstjn.com)

## Data

The library uses [TV direkt](http://www.tvdirekt.de/tatort-heute-abend.html) to get the most recent air times of Tatort. Feel free to add a second data source, just make sure to implement the same interface!
