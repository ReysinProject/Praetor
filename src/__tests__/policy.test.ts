import { describe, it, expect } from 'vitest';
import { Policy } from '../policy';

class User {
    constructor(public id: number, public role: string) {}
}

class Resource {
    constructor(public id: number, public owner: User) {}
}

describe('Policy', () => {
    it('should allow editing if the actor is the owner', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor === resource.owner);

        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(policy.allows('edit', owner, resource)).toBe(true);
    });

    it('should allow editing if the actor is an admin', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor.role === 'admin');

        const admin = new User(2, 'admin');
        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(policy.allows('edit', admin, resource)).toBe(true);
    });

    it('should not allow editing if the actor is neither the owner nor an admin', () => {
        const policy = new Policy<User, Resource>('resource');
        policy.rule('edit', (actor, resource) => actor === resource.owner || actor.role === 'admin');

        const user = new User(3, 'user');
        const owner = new User(1, 'user');
        const resource = new Resource(1, owner);

        expect(policy.allows('edit', user, resource)).toBe(false);
    });
});