# lighty-clipboard.js

`lighty-clipboard.js` is a plain JavaScript library allowing its user to easily copy or cut text.

## Usage

### Copy / cut from element

On **btn** click, **input**'s text will be copied to the clipboard.

```javascript
new LightyClipboard({
    copy_trigger: btn,
    copy_target: "input.copy-mail",
    cut: true
});
```

 - [ **DOMElement** | **SelectorString** ] `copy_trigger` - The querySelector string or the element which will trigger the action.
 - [ **DOMElement** | **SelectorString** ] `copy_target` - The querySelector string or the element which contains the text input.
 - **boolean** `cut` - Allow cutting option.

Note : `cut` is optional and can be ignored or set to `false`.

 ### Copy from string

On **btn** click, **input**'s text will be copied to the clipboard.

 ```javascript
 new LightyClipboard({
    copy_trigger: btn,
    copy_data: "This string will be copied."
 });
 ```

- **string** `copy_data` - A string to be copied.

Note : when copying from an existing string, the `cut` property must be set to `false` or ignored.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - see the LICENSE.md file for details.

## Author

Alexis Philip ([Website](https://alexisphilip.fr),
[GitHub](https://github.com/alexis-philip),
[LinkedIn](https://www.linkedin.com/in/alexis-philip-019955176)). 