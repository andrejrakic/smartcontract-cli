# Smart Contract CLI

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g smartcontract-cli
$ smartcontract COMMAND
running command...
$ smartcontract (--version)
smartcontract-cli/0.0.1 darwin-arm64 node-v16.13.2
$ smartcontract --help [COMMAND]
USAGE
  $ smartcontract COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`smartcontract help [COMMAND]`](#smartcontract-help-command)
- [`smartcontract touch [FILENAME]`](#smartcontract-touch-filename)

## `smartcontract help [COMMAND]`

Display help for smartcontract.

```
USAGE
  $ smartcontract help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for smartcontract.
```

## `smartcontract touch [FILENAME]`

Generate new Smart Contract file

```
USAGE
  $ smartcontract touch [FILENAME] [-c]

FLAGS
  -c, --chainlink

DESCRIPTION
  Generate new Smart Contract

EXAMPLES
  $ smartcontract touch

  $ smartcontract touch [FILENAME]

  $ smartcontract touch --chainlink
```

<!-- commandsstop -->
