# Praetor

A type-safe, flexible permissions management system for TypeScript applications.

## Features

- 🔒 **Type-safe permission rules** - Define and enforce permissions with full TypeScript support
- 🎯 **Fine-grained access control** - Create detailed rules for different actions on resources
- 🔌 **Pluggable architecture** - Register multiple policies for different resource types
- ⚡ **Lightweight and efficient** - Minimal overhead for permission checks
- 🎨 **Flexible rule definitions** - Write custom logic for complex permission scenarios

## Installation

```bash
npm install praetor
# or
yarn add praetor
```

## Quick Start

Here's a simple example showing how to set up and use Praetor:

```typescript
import { Client, Policy } from 'praetor';

// Initialize the client
const client = new Client();

// Define a policy for resources
const RessourcePolicy = new Policy<User, Resource>('resource');

// Add a rule for editing resources
RessourcePolicy.rule('edit', (actor, resource) => {
    return actor === resource.owner || actor.role === 'admin';
});

// Register the policy with the client
client.register('resource', RessourcePolicy);

// Check permissions
const user1 = new User(1, 'user');
const resource1 = new Resource(1, user1);

if (client.allows('resource', 'edit', user1, resource1)) {
    console.log('User is allowed to edit the resource.');
} else {
    console.log('User is not allowed to edit the resource.');
}
```

## Core Concepts

### Client

The `Client` is the main entry point for Praetor. It manages policies and provides the interface for checking permissions.

### Policy

A `Policy` defines the rules for a specific type of resource. Policies are generic and type-safe, ensuring that your permission rules are correctly typed.

### Rules

Rules are functions that determine whether an action is allowed. They receive the actor (user) and the resource as parameters and return a boolean.

## API Reference

### Client

```typescript
class Client {
    constructor();
    register(name: string, policy: Policy<any, any>): void;
    allows(policy: string, action: string, actor: any, resource: any): boolean;
}
```

### Policy

```typescript
class Policy<Actor, Resource> {
    constructor(name: string);
    rule(action: string, fn: (actor: Actor, resource: Resource) => boolean): void;
}
```

## Advanced Usage

### Multiple Rules per Action

```typescript
const PostPolicy = new Policy<User, Post>('post');

PostPolicy.rule('edit', (actor, post) => actor.id === post.authorId);
PostPolicy.rule('edit', (actor, post) => actor.role === 'admin');
```

### Async Rules

```typescript
const DocPolicy = new Policy<User, Document>('document');

DocPolicy.rule('view', async (actor, doc) => {
    const permissions = await fetchUserPermissions(actor.id);
    return permissions.includes(doc.id);
});
```

### Custom Resource Types

```typescript
interface User {
    id: number;
    role: string;
}

interface Project {
    id: number;
    members: User[];
}

const ProjectPolicy = new Policy<User, Project>('project');

ProjectPolicy.rule('manage', (actor, project) => {
    return project.members.some(member => 
        member.id === actor.id && member.role === 'manager'
    );
});
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.