const expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    // store res in variable
    // assert from match
    // assert text match
    // assert createdAt is a number

    var from = 'ivan',
        text = 'test message';

    var msg = generateMessage(from, text);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({from, text});

  })
});