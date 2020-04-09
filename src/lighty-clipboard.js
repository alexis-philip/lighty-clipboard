/**
 * Clipboard class.
 *
 * This class can execute a "copy" or a "cut" action.
 * The action is performed from a "click" user event.
 * The copied or cut text can be from an text field or from a direct string.
 */
/**
 * TODO:
 *  add production script (minify & remove this.testdata()).
 */
class LightyClipboard
{
    /**
     * @private {object} data - Object containing the setup data.
     */
    data;

    /**
     * Clipboard constructor.
     * @param {object} data - The object containing the setup data.
     */
    constructor(data)
    {
        this.data = data;
        this.testData();
        this.route();
    }

    /**
     * Performs test on the "data" object to ensure the data is correct.
     *
     * Tests the properties names.
     * Tests the values.
     */
    testData()
    {
        let available_properties = [
                "copy_trigger",
                "copy_target",
                "copy_data",
                "cut"
            ];

        // getOwnPropertyNames() and not keys() because we need all of the properties, even if the user set one to "enumerable: false".
        Object.getOwnPropertyNames(this.data).forEach(function(key) {
            // If a property name is not valid.
            if (!available_properties.includes(key)) {
                throw new Error("\"" + key + "\" is not a valid parameter.\nPlease refer to the documentation for more information.");
            }
        });

        // Checking the properties:
        // If "copy_trigger" is not declared.
        if (!("copy_trigger" in this.data)) {
            throw new Error("\"copy_trigger\" property is required in the Clipboard call.\nPlease declare the property.");
        }
        // If "copy_target" or "copy_data" is not declared.
        if (!("copy_target" in this.data) && !("copy_data" in this.data)) {
            throw new Error("\"copy_target\" or \"copy_data\" property is required in the Clipboard call.\nPlease declare only one of them.");
        }
        // If "copy_target" and "copy_data" are declared.
        if ("copy_target" in this.data && "copy_data" in this.data) {
            throw new Error("\"copy_target\" and \"copy_data\" properties cannot be declared together in the Clipboard call.\nPlease declare only one of them.");
        }
        // If "copy_data" and "cut" are declared.
        if ("copy_data" in this.data && "cut" in this.data) {
            throw new Error("\"copy_data\" and \"cut\" properties cannot be declared together in the Clipboard call.\nPlease declare only one of them.");
        }

        // Checking the values:
        // If "copy_trigger" is declared.
        if ("copy_trigger" in this.data) {
            // If "copy_trigger" is undefined.
            if (this.data.copy_trigger == null) throw new Error("\"copy_trigger\" value is null.\nPlease precise an element which will trigger the copy or cut action.");
            // If "copy_trigger" is a string and not already a DOM element.
            if (typeof this.data.copy_trigger === "string") {
                let selection = this.data.copy_trigger = document.querySelector(this.data.copy_trigger);
                // If the selector returns null.
                if (selection == null) throw new Error("\"copy_trigger\" value is not a valid selector.\nPlease precise an element with an text field so its text can be copied or cut.");
            }
        }
        // If "copy_target" is declared.
        if ("copy_target" in this.data) {
            // If "copy_target" is null.
            if (this.data.copy_target == null) throw new Error("\"copy_target\" value is null.\nPlease precise an element with an text field so its text can be copied or cut.");
            // If "copy_target" is a string and not already a DOM element.
            if (typeof this.data.copy_target === "string") {
                let selection = this.data.copy_target = document.querySelector(this.data.copy_target);
                // If the selector returns null.
                if (selection == null) throw new Error("\"copy_target\" value is not a valid selector.\nPlease precise an element with an text field so its text can be copied or cut.");
            }
        }
        // If "copy_data" is declared.
        if ("copy_data" in this.data) {
            // If "copy_data" is null.
            if (this.data.copy_data == null) throw new Error("\"copy_data\" value is null.\nPlease precise a string.");
            // If "copy_data" is not a string.
            else if (typeof this.data.copy_data !== "string") throw new Error("\"copy_data\" value is not a string.\nPlease precise a string.");
        }
        // If "cut" is declared.
        if ("cut" in this.data) {
            // If "cut" is null.
            if (this.data.cut == null) throw new Error("\"cut\" value is null.\nPlease precise a boolean.");
            // If "cut" is not a string.
            else if (typeof this.data.cut !== "boolean") throw new Error("\"cut\" value is not a boolean.\nPlease precise a boolean.");
        }
    }

    /**
     * Routes the user query with the correct arguments.
     */
    route()
    {
        // If "data.copy_data" exits, we need to copy from a "string".
        if ("copy_data" in this.data) {
            this.setListener("string")
        }
        // If "data.copy_data" does not exist, and we have two targets, we need to copy from an "element".
        else {
            this.setListener("element");
        }
    }

    /**
     * Sets a listener on the element which will triggers a copy method.
     * @param {string} type_copy - "string" to copy from a string" or "element" to copy from an element.
     */
    setListener(type_copy)
    {
        this.data.copy_trigger.addEventListener("click", ev => {

            if (ev.target === this.data.copy_trigger) {

                // Copies from a string.
                if (type_copy === "string") {

                    let text_area = document.createElement("textarea"); // Creates a text area element.
                    text_area.value = this.data.copy_data; // Appends the string in the element.
                    document.body.appendChild(text_area); // Appends the text field element to the DOM.

                    this.copy(text_area); // Copies the text in the element.

                    document.body.removeChild(text_area); // Removes the element from the DOM.
                }
                // Copies from an element.
                else {
                    // TODO: copy_trigger must be a input.
                    //  add functionality so innerHTML / text can be copied.
                    //  then change testData() "copy_trigger" & "copy_target" tests so they also test innerHTML, make
                    //    sure you can copy empty innerHTML or value without error!
                    //  then change "copy_data" to "copy_string".
                    this.copy(this.data.copy_target);
                }
            }
        });
    }

    /**
     * Copies the text from a text field.
     * @param {HTMLTextAreaElement} el - The DOM element which contains the text (to be copied or cut) in its text field.
     */
    copy(el)
    {
        let command = "copy";

        // If the user set "cut" to "true" in the data.
        if ("cut" in this.data && this.data.cut) command = "cut";

        // Select the text in the element's text field.
        el.select();

        // Copies the currently selected text.
        document.execCommand(command);
    }
}
