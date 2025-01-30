Example code:

```typescript
import { Client } from './client';
import { Policy } from './policy';
class User {
    constructor(public id: number, public role: string) {}
}

class Resource {
    constructor(public id: number, public owner: User) {}
}

const myPolicy = new Policy<User, Resource>('resource');

myPolicy.rule('edit', (actor, resource) => {
    return actor === resource.owner || actor.role === 'admin';
});

const client = new Client();
client.register('resource', myPolicy);

const user1 = new User(1, 'user');
const user2 = new User(1, 'user2');
const resource1 = new Resource(1, user1);

if (client.allows('resource', 'edit', user1, resource1)) {
    console.log('User is allowed to edit the resource.');
} else {
    console.log('User is not allowed to edit the resource.');
}

if (client.allows('resource', 'edit', user2, resource1)) {
    console.log('User 2 is allowed to edit the resource.');
} else {
    console.log('User 2 is not allowed to edit the resource.');
}
```