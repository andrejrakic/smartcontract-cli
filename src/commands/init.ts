import { Command } from "@oclif/core";
import { exec, which, echo, exit } from "shelljs";
import { prompt } from "inquirer";

const hardhatStarterKit = `https://github.com/smartcontractkit/hardhat-starter-kit.git`;
const foundryStarterKit = `https://github.com/smartcontractkit/foundry-starter-kit.git`;
const brownieStarterKit = `https://github.com/smartcontractkit/chainlink-mix.git`;
const anchorStarterKit = `https://github.com/smartcontractkit/solana-starter-kit.git`;

export default class Init extends Command {
  static description = "Generate new Project";

  static examples = [`smartcontract init`];

  public async run(): Promise<void> {
    if (!which(`git`)) {
      echo(
        `This command requires git. Follow https://git-scm.com/book/en/v2/Getting-Started-Installing-Git to install it`
      );
      exit(1);
    }

    const responses: any = await prompt([
      {
        name: `newProject`,
        message: `Select Smart Contract Framework`,
        type: `list`,
        choices: [
          { name: `Hardhat (JavaScript)` },
          { name: `Hardhat (TypeScript)` },
          { name: `Foundry` },
          { name: `Brownie` },
          { name: `Anchor` },
        ],
        default: `Hardhat (JavaScript)`,
      },
    ]);

    switch (responses.newProject) {
      case `Hardhat (JavaScript)`:
        exec(`git clone ${hardhatStarterKit}`);
        break;
      case `Hardhat (TypeScript)`:
        exec(
          `git clone ${hardhatStarterKit} && cd hardhat-starter-kit && git checkout typescript`
        );
        break;
      case `Foundry`:
        exec(`git clone ${foundryStarterKit}`);
        break;
      case `Brownie`:
        exec(`git clone ${brownieStarterKit}`);
        break;
      case `Anchor`:
        exec(`git clone ${anchorStarterKit}`);
        break;
      default:
        exec(`git clone ${hardhatStarterKit}`);
        break;
    }
  }
}
