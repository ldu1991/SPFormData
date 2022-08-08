# SPFormData

VanillaJS (_pure JavaScript_) plugin that reads form data with a change in **Get URL parameters**

## Install

```
npm install --save sp-form-data
```

## Usage

#### HTML:
``` html
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

#### JavaScript:
``` javascript
// import SPFormData
import SPFormData from 'sp-form-data';
```
If you don't want to include **SPFormData** files in your project, you can include it with a file
``` html
<script src="/dist/sp-form-data.js"></script>
```

#### Initialization:

``` javascript
new SPFormData('#filter', {
    submitTimeout: true,
    delayBeforeSend: 600,
    autoSubmit: true,
    changeGetUrl: true,
    formSynchronization: false,
    response: data => {        
        // {
        // date: DESC,
        // option: [1, 3] or "2" /// if not more than one result then the answer will contain a string,
        // search: "product name"
        // }
    }
});
```

#### GET URL:
```
site.com?search=product+name&date=DESC&option=1,2
```

### Options:

``` js
// Clearing timeout during form selection/input. Default: true
submitTimeout: boolean

// Delay before executing and submitting the form. Default: 600
delayBeforeSend: number

// Listen for form changes and auto submit. Default: true 
autoSubmit: boolean

// Change get url or not.  Default: true
changeGetUrl: boolean

// You can synchronize several forms so that they work as one. Default: false
// Example: demo/sp-form-data-default-synchronize.html
formSynchronization: boolean
```
