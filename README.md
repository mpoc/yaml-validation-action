# Remote YAML file validation

Validates a YAML file by converting it to JSON and sending it to a remote HTTP API endpoint via a POST request.

The response should be of the following format:

```json
{
    "response": {
        "isValid": false,
        "errors": [
            "Error 1",
            "Error 2"
        ]
    }
}
```

`isValid` is a boolean which specifies whether the YAML definition is valid according to some rule set that the HTTP API endpoint can specify.
`errors` is a array of strings, each of which explains an error which makes the file invalid.
If `isValid` is `true`, then `errors` should be an empty array.

## Inputs

### `api-endpoint`

**Required** The URL for the HTTP API endpoint which validates the YAML file.

### `yaml-file`

**Required** The name of the YAML file to validate.

## Example usage

```yaml
uses: actions/yaml-validation-action@v1
with:
    api-endpoint: 'http://example.com/validate'
    yaml-file: assignment.yml
```
