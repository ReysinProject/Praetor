interface PolicyRegistry {
    [key: string]: Rule;
}

class Policy {
    private _registry: PolicyRegistry = {};
    public label: string = "";

    constructor(
        public name: string = "",
    ) {}

    public rule(name: string) {
        return (
            func: (action: string, resource: string, context: any) => boolean
        ) => {
            let rule_name = name;
            if (this.label) {
                rule_name = `${this.label}.${name}`;
            }
            let new_rule = new Rule(rule_name, func);
            this._register(name, new_rule);
            return func
        }
    }

    private _register(action: string, rule: Rule) {
        if (!this._registry[action]) {
            this._registry[action] = rule;
        }
    }

    public allows(action: string, actor: any, resource: string, context: any) {
        try {
            return this.authorize(action, actor, resource, context);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }

    public authorize(action: string, actor: any, resource: string, context: any) {
        if (!this._registry[action]) {
            throw new Error(`No rule found for action: ${action}`);
        }

        if (!this._registry[action].evaluate(action, actor, resource, context)) {
            throw new Error(`Authorization denied for action: ${action}`);
        }

        return true;
    }
}