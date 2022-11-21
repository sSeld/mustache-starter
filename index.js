import fs from "node:fs";

import mustache from "mustache";

let configFile = fs.readFileSync('config.json', 'utf-8');
var config = JSON.parse(configFile);
const run = async () => {

    for (const templateConfig of config.templates) {
        let template = fs.readFileSync(`templates/${templateConfig.name}.mustache`, 'utf-8');
        console.log(configFile);
        console.log(template);
        let output = new Generator(template, templateConfig.view).generate();
        fs.writeFileSync(`output/${templateConfig.name}.${templateConfig.output}`, output);
    }
}

class Generator {
    template;
    view;
    constructor(template, view){
        this.template = template;
        this.view=view;
    }

    generate(){
        return mustache.render(this.template, this.view);

    }
}

run().then().catch(console.error);
