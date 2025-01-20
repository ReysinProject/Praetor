class PraetorClient {

    constructor() {
        console.log('PraetorClient constructor');
    }

    public register(policy: Policy) {
        console.log('PraetorClient register');
    }

    public allows(action: string, resource: string, context: any) {
        console.log('PraetorClient allows');

        console.log('action: ' + action);
        console.log('resource: ' + resource);
        console.log('context: ' + context);
    }

}