type RuleFunction<A, R> = (actor: A, resource: R, context?: any) => boolean;

export class Policy<A, R> {
    private rules: Map<string, RuleFunction<A, R>> = new Map();

    constructor(private resourceType: string) {}

    rule(name: string, fn: RuleFunction<A, R>): void {
        this.rules.set(name, fn);
    }

    allows(action: string, actor: A, resource: R, context?: any): boolean {
        const rule = this.rules.get(action);
        if (rule) {
            return rule(actor, resource, context);
        }
        return false;
    }
}