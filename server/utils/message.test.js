const expect = require("expect");
const chai = require("chai");
const should = chai.should();
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "Adi";
    var text = "Some message";
    var message = generateMessage(from, text);

    message.createdAt.should.that.is.a("number");
    message.should.to.include({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate location object", () => {
    var from = "Toro";
    var latitude = 15;
    var longitude = 19;
    var url = "https://google.com/maps?q=15,19";
    var location = generateLocationMessage(from, latitude, longitude);

    location.createdAt.should.that.is.a("number");
    location.should.to.include({ from, url });
  });
});
