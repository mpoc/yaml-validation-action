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
        console.log('YAML converted to JSON:');
        console.log(convertedFile);
        
        const response = await fetch(apiEndpoint, {
            method: "post",
            body: JSON.stringify(convertedFile),
            headers: { "Content-Type": "application/json" },
        });
        
        if (!response.ok) {
            // const errorText = await response.text();
            const errorText = response.statusText;
            throw new Error(errorText);
        }
        
        const responseJson = await response.json();
        console.log('API response:')
        console.log(responseJson);

        if (!responseJson.response.isValid) {
            core.setFailed(`Invalid YAML definition:%0A${responseJson.response.errors.join('%0A')}`);
            return;
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})();
