const expect = require("expect");
const chai = require("chai");
const should = chai.should();
const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    var res = isRealString(98);
    res.should.equal(false);
  });

  it("should reject string with only spaces", () => {
    var res = isRealString("     ");
    res.should.equal(false);
  });

  it("should allow string with non-space characters", () => {
    var res = isRealString("  Supri  ");
    res.should.equal(true);
  });
});
