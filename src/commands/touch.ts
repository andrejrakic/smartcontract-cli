import { Command, Flags, CliUx } from "@oclif/core";
import { exec } from "shelljs";
import { prompt } from "inquirer";
import * as contracts from "../contracts/";

const generateSolidityContract = (sourceCode: string, fileName: string) => {
  CliUx.ux.action.start(`Generating new solidity smart contract`);

  exec(`echo "${sourceCode}" > ${fileName}.sol`);

  CliUx.ux.action.stop();
  CliUx.ux.log(`Generated ${fileName}.sol`);
};

export default class Touch extends Command {
  static description = `Generate new Solidity file`;

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
          ],
          default: `PriceFeedConsumer`,
        },
      ]);

      switch (responses.chainlinkSample) {
        case `PriceFeedConsumer`:
          generateSolidityContract(
            contracts.priceFeedConsumer,
            `PriceFeedConsumer`
          );
          break;
        case `VRFV2Consumer`:
          generateSolidityContract(contracts.vrfV2Consumer, `VRFV2Consumer`);
          break;
        case `KeepersCompatible`:
          generateSolidityContract(
            contracts.keeperCompatible,
            `KeepersCompatible`
          );
          break;
        case `AnyAPIConsumer`:
          generateSolidityContract(contracts.anyAPIConsumer, `AnyAPIConsumer`);
          break;
        default:
          generateSolidityContract(
            contracts.priceFeedConsumer,
            `PriceFeedConsumer`
          );
          break;
      }
    } else {
      args.fileName
        ? generateSolidityContract(contracts.counter, args.fileName)
        : generateSolidityContract(contracts.counter, `Counter`);
    }
  }
}
