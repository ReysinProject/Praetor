class Rule {
    constructor(rule_name: string, func: (action: string, resource: string, context: any) => boolean) {
        
    }


    evaluate(action: string, actor: any, resource: string, context: any) {
        return false;
    }
}