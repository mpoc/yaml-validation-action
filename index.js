const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const yaml = require('js-yaml');
const fetch = require('node-fetch');

(async () => {
    try {
        const apiEndpoint = core.getInput('api-endpoint');
        const yamlFile = core.getInput('yaml-file');
        
        const convertedFile = yaml.load(fs.readFileSync(yamlFile, 'utf8'));
        console.log({ convertedFile });
        
        const response = await fetch(apiEndpoint, {
            method: "post",
            body: JSON.stringify(convertedFile),
            headers: { "Content-Type": "application/json" },
        });
        console.log({ response });
        
        if (!response.ok) {
            // const errorText = await response.text();
            const errorText = response.statusText;
            throw new Error(errorText);
        }
        
        const responseJson = await response.json();
        console.log({ responseJson });

        if (!responseJson.response.isValid) {
            core.setFailed('Invalid YAML definition:\n' + responseJson.response.errors.join('\n'));
            return;
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})();
