const expect = require('expect');
const chai = require('chai');
const should = chai.should();
const {Users} = require('./users');

describe('Users', () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
            id: '1',
            name: 'Toro',
            room: 'React Course'
            },
            {
            id: '2',
            name: 'Sandy',
            room: 'Node Course'
            },
            {
            id: '3',
            name: 'Ari',
            room: 'Node Course'
            }
    ]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Supri',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        users.users.should.deep.equal([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        user.id.should.equal(userId);
        users.users.length.should.equal(3);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist;
        users.users.length.should.equal(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        user.id.should.equal(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        
        expect(user).toNotExist;
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        userList.should.deep.equal(['Sandy', 'Ari']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        userList.should.deep.equal(['Toro']);
    });
});