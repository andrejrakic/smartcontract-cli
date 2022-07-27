import { Command, Flags, CliUx } from "@oclif/core";
import { exec } from "shelljs";
import { prompt } from "inquirer";
import * as contracts from "../contracts/";

enum Extension {
  Solidity = `.sol`,
  Rust = `.rs`,
}

const generateSmartContract = (
  sourceCode: string,
  fileName: string,
  extension: Extension
) => {
  CliUx.ux.action.start(`Generating new smart contract`);

  exec(`echo "${sourceCode}" > ${fileName}${extension}`);

  CliUx.ux.action.stop();
  CliUx.ux.log(`Generated ${fileName}${extension}`);
};

export default class Touch extends Command {
  static description = `Generate new Smart Contract`;

  static examples = [
    `smartcontract touch`,
    `smartcontract touch [FILENAME]`,
    `smartcontract touch --chainlink`,
  ];

  static flags = {
    // // flag with a value (-n, --name=VALUE)
    // name: Flags.string({ char: "n", description: "name to print" }),
    // // flag with no value (-f, --force)
    // force: Flags.boolean({ char: "f" }),
    chainlink: Flags.boolean({ char: `c` }),
  };

  // static args = [{ name: "fileName" }, { name: "destination" }];
  static args = [{ name: "fileName" }];

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Touch);

    if (flags.chainlink) {
      const responses: any = await prompt([
        {
          name: `chainlinkSample`,
          message: `Select Chainlink sample contract to create`,
          type: `list`,
          choices: [
            { name: `PriceFeedConsumer` },
            { name: `VRFV2Consumer` },
            { name: `KeepersCompatible` },
            { name: `AnyAPIConsumer` },
            { name: `SolanaPriceFeedConsumer` },
            { name: `SolanaPriceFeedConsumer (Anchor)` },
          ],
          default: `PriceFeedConsumer`,
        },
      ]);

      switch (responses.chainlinkSample) {
        case `PriceFeedConsumer`:
          generateSmartContract(
            contracts.priceFeedConsumer,
            `PriceFeedConsumer`,
            Extension.Solidity
          );
          break;
        case `VRFV2Consumer`:
          generateSmartContract(
            contracts.vrfV2Consumer,
            `VRFV2Consumer`,
            Extension.Solidity
          );
          break;
        case `KeepersCompatible`:
          generateSmartContract(
            contracts.keeperCompatible,
            `KeepersCompatible`,
            Extension.Solidity
          );
          break;
        case `AnyAPIConsumer`:
          generateSmartContract(
            contracts.anyAPIConsumer,
            `AnyAPIConsumer`,
            Extension.Solidity
          );
          break;
        case `SolanaPriceFeedConsumer`:
          generateSmartContract(
            contracts.solanaPriceFeedConsumer,
            `SolanaPriceFeedConsumer`,
            Extension.Rust
          );
          break;
        case `SolanaPriceFeedConsumer (Anchor)`:
          generateSmartContract(
            contracts.anchorPriceFeedConsumer,
            `AnchorPriceFeedConsumer`,
            Extension.Rust
          );
          break;
        default:
          generateSmartContract(
            contracts.priceFeedConsumer,
            `PriceFeedConsumer`,
            Extension.Solidity
          );
          break;
      }
    } else {
      args.fileName
        ? generateSmartContract(
            contracts.counter,
            args.fileName,
            Extension.Solidity
          )
        : generateSmartContract(
            contracts.counter,
            `Counter`,
            Extension.Solidity
          );
    }
  }
}
