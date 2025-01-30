import { describe, it, expect } from 'vitest';
import { Client } from '../client';
import { Policy } from '../policy';

class User {
    constructor(public id: number, public role: string) {}
}

class Resource {
    constructor(public id: number, public owner: User) {}
}

describe('Client', () => {
    it('should register a policy and allow editing if the actor is the owner', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor === resource.owner);

        const client = new Client();
        client.register('resource', policy);

        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(client.allows('resource', 'edit', owner, resource)).toBe(true);
    });

    it('should register a policy and allow editing if the actor is an admin', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor.role === 'admin');

        const client = new Client();
        client.register('resource', policy);

        const admin = new User(2, 'admin');
        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(client.allows('resource', 'edit', admin, resource)).toBe(true);
    });

    it('should register a policy and not allow editing if the actor is neither the owner nor an admin', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor === resource.owner || actor.role === 'admin');

        const client = new Client();
        client.register('resource', policy);

        const user = new User(3, 'user');
        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(client.allows('resource', 'edit', user, resource)).toBe(false);
    });
});