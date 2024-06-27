# SPFormData

VanillaJS (_pure JavaScript_) plugin that reads form data and Change **URL Query Parameters**, works with all types of fields

**Note:** SPFormData does not work with field type "file"!

## Install:

```text
npm install --save sp-form-data
```

## API:

### HTML Layout:

```html

<form id="filter-sync">
    <label for="text-field">Text field:</label>
    <input type="text" id="text-field" name="text" required>
    
    <label for="email-field">Email field:</label>
    <input type="email" id="email-field" name="email" required>
    
    <label for="password-field">Password field:</label>
    <input type="password" id="password-field" name="password" required>

    <label>
        <span>Checkbox 1</span>
        <input type="checkbox" name="checkbox" value="1"/>
    </label>
    <label>
        <span>Checkbox 2</span>
        <input type="checkbox" name="checkbox" value="2"/>
    </label>
    <label>
        <span>Checkbox 3</span>
        <input type="checkbox" name="checkbox" value="3"/>
    </label>
    <label>
        <span>Checkbox 4</span>
        <input type="checkbox" name="checkbox" value="4"/>
    </label>

    <div>Radio:</div>
    <input type="radio" id="radio-button1" name="radio" value="1">
    <label for="radio-button1">Option 1</label>
    <input type="radio" id="radio-button2" name="radio" value="2">
    <label for="radio-button2">Option 2</label>
    <input type="radio" id="radio-button3" name="radio" value="3">
    <label for="radio-button3">Option 3</label>
    
    <label for="dropdown">Dropdown:</label>
    <select id="dropdown" name="dropdown">
        <option value="">No Option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
    </select>

    <label for="textarea">Multiline text field:</label>
    <textarea id="textarea" name="textarea"></textarea>

    <label for="range">Value range:</label>
    <input type="range" id="range" name="range" min="0" max="100" step="1">

    <label for="datetime">Date and time:</label>
    <input type="datetime-local" id="datetime" name="datetime">

    <label for="color">Color palette:</label>
    <input type="color" id="color" name="color">

    <!-- Submit button, needed if option autoSubmit: false -->
    <input type="submit" value="submit">
</form>
```

#### Using JS Modules

```js
import SPFormData from 'sp-form-data';
```

#### Using Build Script

```html
<script src="/dist/sp-form-data.js"></script>
```

### Initialize:

```js
let SPFD = new SPFormData('#filter', {})
```

You can also work directly with DOM nodes in several ways:

```js
let node = document.querySelector('#filter');
let nodeList = document.querySelectorAll('#filter');
let nodeArray = [
    document.querySelector('#filter'),
    document.querySelector('#sorting'),
    document.querySelector('#pagination')
];

new SPFormData(node, {})
new SPFormData(nodeList, {})
new SPFormData(nodeArray, {})
new SPFormData('#filter', {})
new SPFormData('#filter, #sorting, #pagination', {})
```

#### GET URL:

```text
site.com?search=product+name&date=DESC&option=1,2
```

### Parameters
|Name|Type|Default|Description|
|---|---|---|---|
|init|boolean|true|Whether **SPFormData** should be initialized automatically when you create an instance. If disabled, you need to init it manually by calling **SPFD.init()**|
|separator|string|","|URL Query Parameters separator
|delayBeforeSend|number|300|Delay before executing and submitting the form.
|autoSubmit|boolean|true|Listen for form changes and auto submit
|changeQueryParameters|boolean|true|Do I need to change query parameters of the URL request **Warning! If true, then file field types will not work.**
|presetQueries|array|[...input[name]]|**SPFormData** will change query parameters and return data, in the order specified in the array of fields
|excludeQueryParameters|array|[]|When **changeQueryParameters:true**, then the fields from the array are excluded from the query parameters
|multipleArray|boolean|true|Whether the multiple choice will be returned as an array ```(?option=1,2,3,4 => array [1, 2, 3, 4] or string 1,2,3,4)```
|secondForm|string<br>array<br>node<br>nodeList<br>nodeArray|null|Secondary forms, such as a pagination form, etc.<br>**Note: when updating the main form, all secondary forms are brought to the default state**


### Methods
|Methods|Description|
|---|---|
|SPFD.init()|Initialize SPFormData|
|SPFD.update()|You should call it after you change form manually, or do any custom DOM modifications with SPFormData<br>**Note: Doesn't work when "autoSubmit: false"**|
|SPFD.reset()|Clear form and URL Query Parameters and reset to default<br>**Note: Doesn't work when "autoSubmit: false"**|
|SPFD.on(event, handler)|Add event handler|
|SPFD.once(event, handler)|Add event handler that will be removed after it was fired|
|SPFD.off(event, handler)|Remove event handler|
|SPFD.setValue(name, value)|(name: object Node or String) Sets the field value by its "name" attribute or object Node. <br>**Note: Doesn't work with "checkbox" and "radio" field types!** <br> **Note 2: "value" is required!** <br> `SPFD.setValue('size', 'Lorem ipsum dolor.') or SPFD.setValue(document.querySelector('#filter [name="size"]'), 'Lorem ipsum dolor.')`|
|SPFD.setChecked(name, value)|(name: object Node or String) Checked input type checkbox or radio. <br> **Note: "value" is required if string name is used!** <br> `SPFD.setChecked('size', 3) or SPFD.setChecked(document.querySelector('#filter [name="size"]'), 3) or SPFD.setChecked(document.querySelector('#filter [name="size"]'))`


### Events

|Event name|Arguments|Description|
|:---|:----:|:---|
|beforeInit|(no-arguments)|Event will fired right before initialization|
|afterInit|(no-arguments)|Event will fired right after initialization|
|init|(query)|Fired right after **SPFormData** initialization.<br><br>Event will be fired right after SPFormData initialization. Note that with **SPFD.on('init')** syntax it will work only in case you set **init: false** parameter:<br>```const SPFD = new SPFormData('#filter', {init: false});```<br>```SPFD.on('init', function(query) { /* do something */ });```<br>```SPFD.on('beforeInit', function(query) { /* do something */ });```<br>```SPFD.on('afterInit', function(query) { /* do something */ });```<br>```SPFD.init();```<br><br>Otherwise use it as the parameter:<br>```const SPFD = new SPFormData('#filter', {```<br>```// other parameters```<br>```on: {```<br>```init: function (query) { /* do something */ }```<br>```}```<br>```});```|
|change|(query)|Event will be fired when currently form is changed|
|update|(query)|Event will be fired after SPFD.update() call|
|reset|(query)|Event will be fired when currently form is reset|
|submit|(query)|Event will be fired when the form is submitted. Only if parameter **autoSubmit: false**|
|popstate|(query)|Event will be fired when the active history entry changes while the user navigates the session history|


1) Using on parameter on SPFormData initialization:
```js
const SPFD = new SPFormData('#filter', {
    // ...
    on: {
        init: function (query) {
            console.log(query);
        },
    },
});
```
2) Using on method after SPFormData initialization.
```js
const SPFD = new SPFormData('#filter', {
  // ...
});
SPFD.on('change', function (query) {
  console.log(query);
});

```
