const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'lol',
      room: 'test'
    },{
      id: '2',
      name: 'jen',
      room: 'node course'
    }, {
      id: '3',
      name: 'mike',
      room: 'node course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Test',
      room: 'Test Room'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should return names for node course room', () => {

    var userList = users.getUserList('node course');
    expect(userList).toEqual(['jen', 'mike'])

  });

  it('should return names for test room', () => {

    var userList = users.getUserList('test');
    expect(userList).toEqual(['lol']);

  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);

  });

  it('shuold not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);

  });

  it('should not find a user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  })

});