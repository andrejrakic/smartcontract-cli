import { expect, test } from "@oclif/test";

describe.skip("init", () => {
  test
    .stdout()
    .command(["init"])
    .it("clones starter kit project", (ctx) => {
      expect(ctx.stdout).to.contain("Cloning into");
    });
});
