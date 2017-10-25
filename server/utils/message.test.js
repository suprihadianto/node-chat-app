const expect = require('expect');
const chai = require('chai');
const should = chai.should();
const {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "Adi";
        var text = "Some message";
        var message = generateMessage(from, text);

        message.createdAt.should.that.is.a('number');
        message.should.to.include({from, text});
        
    });
});