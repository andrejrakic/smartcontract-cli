import { expect, test } from "@oclif/test";
import { exec } from "shelljs";

describe("touch", () => {
  test
    .stdout()
    .command(["touch"])
    .it("generates Counter.sol", (ctx) => {
      expect(ctx.stdout).to.contain(`Generated Counter.sol`);
      exec(`rm Counter.sol`);
    });

  const name: string = "Contract";
  test
    .stdout()
    .command(["touch", name])
    .it("generates Counter.sol with custom name", (ctx) => {
      expect(ctx.stdout).to.contain(`Generated ${name}.sol`);
      exec(`rm ${name}.sol`);
    });
});
