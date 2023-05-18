# DASH Headless

This is a standalone file for rolling a DASH Randomizer seed. It is meant to be used by bots in a Node.js environment.

## Usage
```sh
node ./dash.headless.js [options]

Usage: dash.headless.js -r <vanillaRom> -p <preset> [options]

Generate a randomized DASH seed from the command line

Options:
  -r --vanillaPath <vanillaRom>  path to vanilla rom
  -p --preset <preset>           preset to use
  -b --base-url <url>            base url for rolling the seed (default: "https://dashrando.net/")
  -h, --help                     display help for command
```
