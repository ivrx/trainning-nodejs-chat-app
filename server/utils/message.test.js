const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'admin',
        lat = 1,
        lng = 1;
    var msg = generateLocationMessage(from, lat, lng);

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({
      from,
      url: `https://www.google.com/maps?q=${lat},${lng}`
    })
  })
});