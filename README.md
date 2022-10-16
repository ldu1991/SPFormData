# SPFormData

VanillaJS (_pure JavaScript_) plugin that reads form data with and Change **URL Query Parameters**

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

You can also work directly with DOM nodes in a few ways:

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
|init|boolean|true|Whether **SPFormData** should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling **SPFD.init()**|
|separator|string|","|URL Query Parameters separator
|delayBeforeSend|number|300|Delay before executing and submitting the form.
|autoSubmit|boolean|true|Listen for form changes and auto submit
|changeUrlQuery|boolean|true|Do I need to change the parameters of the URL request
|formSync|boolean|true|You can synchronize several forms so that they work as one
|presetQueries|array|[...input[name]]|**SPFormData** will compare the search fields from the URL, and return only predefined fields in the request
|multipleArray|boolean|true|Whether the multiple choice will be returned as an array ```(?option=1,2,3,4 => array [1, 2, 3, 4] or string 1,2,3,4)```


### Methods
|Methods|Description|
|---|---|
|SPFD.init()|Initialize **SPFormData**
|SPFD.on(data)|Event handler
|SPFD.update()|You must call it every time you change fields dynamically.
|SPFD.reset()|Clear form and URL Query Parameters and reset to default


### Events

1) Using ```on``` parameter in SPFormData initialization:
```js
const SPFD = new SPFormData('#filter', {
    // ...
    on: function (data) {
        // {
        // date: DESC,
        // option: [1, 3] or "2" /// if not more than one result then the answer will contain a string,
        // search: "product name"
        // }
    }
});
```

2) Using ```on``` method after SPFormData initialization:
```js
const SPFD = new SPFormData('#filter', {
    // ...
});

SPFD.on(function (data) {
    // {
    // date: DESC,
    // option: [1, 3] or "2" /// if not more than one result then the answer will contain a string,
    // search: "product name"
    // }
})
```
