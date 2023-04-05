# SPFormData

VanillaJS (_pure JavaScript_) plugin that reads form data and Change **URL Query Parameters**

## Install:

```text
npm install --save sp-form-data
```

## API:

### HTML Layout:

```html

<form id="filter">
    <label>
        <input type="text" name="search" placeholder="Search...">
    </label>

    <label>
        <input type="radio" name="date" value="ASC"/>
        <span>Date: Ascending</span>
    </label>
    <label>
        <input type="radio" name="date" value="DESC"/>
        <span>Date: Descending</span>
    </label>

    <label>
        <span>1</span>
        <input type="checkbox" name="option" value="1"/>
    </label>
    <label>
        <span>2</span>
        <input type="checkbox" name="option" value="2"/>
    </label>
    <label>
        <span>3</span>
        <input type="checkbox" name="option" value="3"/>
    </label>
    <label>
        <span>4</span>
        <input type="checkbox" name="option" value="4"/>
    </label>

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
|changeQueryParameters|boolean|true|Do I need to change query parameters of the URL request
|presetQueries|array|[...input[name]]|**SPFormData** will change query parameters and return data, in the order specified in the array of fields
|multipleArray|boolean|true|Whether the multiple choice will be returned as an array ```(?option=1,2,3,4 => array [1, 2, 3, 4] or string 1,2,3,4)```


### Methods
|Methods|Description|
|---|---|
|SPFD.init()|Initialize SPFormData|
|SPFD.update()|You should call it after you change form manually, or do any custom DOM modifications with SPFormData|
|SPFD.reset()|Clear form and URL Query Parameters and reset to default|
|SPFD.on(event, handler)|Add event handler|
|SPFD.once(event, handler)|Add event handler that will be removed after it was fired|
|SPFD.off(event, handler)|Remove event handler|


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
