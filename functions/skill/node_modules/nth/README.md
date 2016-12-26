nth
===

The 'nth' package contains a dirt simple module that takes an integer and then appends the appropriate place suffix. For example:

- 1 becomes 1st
- 2 becomes 2nd
- 3 becomes 3rd
- 4 becomes 4th
- 13 becomes 13th
- 23 becomes 23rd

Usage
-----

Using the package is very easy. Just download it and install it via NPM:

```bash
npm install nth --save
```

Once the package is downloaded and installed, you just need to require in the module and call the `appendSuffix` method:

```js
var nth = require('nth');
var output = nth.appendSuffix(23);
console.log(output); // 23rd
```

Contributions
-------------

If you find a bug feel free to submit a pull request.

Known Limitations
-----------------

Beyond the few obvious test cases I haven't spend any time on more complex scenarios like dealing with exponents. I can't imagine many folks really using this library in that context anyway :)