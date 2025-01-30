import { Policy } from './policy';

export class Client {
    private policies: Map<string, Policy<any, any>> = new Map();

    register<A, R>(resourceType: string, policy: Policy<A, R>): void {
        this.policies.set(resourceType, policy);
    }

    allows<A, R>(resourceType: string, action: string, actor: A, resource: R, context?: any): boolean {
        const policy = this.policies.get(resourceType);
        if (policy) {
            return policy.allows(action, actor, resource, context);
        }
        return false;
    }
}