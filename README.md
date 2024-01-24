# Overview

Use TinyMCE in your Qodly Project

![image info](public/TinyMCE.png)

### Prerequisites:

- TinyMCE APIKey

## Getting Started

|Name	|Type	|Description	|
|---	|---	|---	|
|`DataSource`	|String	|The dataSource that contains data to display.	|
|`APIKey`	|String	|Your APIKEY to start using TinyMCE.	|
|`Toolbar Location`	|String	|Defines the position of Toolbar and can be one of the following values: `top`, `bottom`, `auto`, The default value is `top`, which means the <Toolbar will displayed on Top of the textEditor.	|
|`Resize`	|Boolean	|If set to `true` you size of the editor will change on depend of the content.	|
|`MenuBar`	|Boolean	|If set to `true` the meny bar will appear and it will give you more options.	|
|`Inline`	|Boolean	|If set to `true` the tolbar won't appear and it will active the inline mode. (This option is not supported on mobile devices.)	|
|`ReadOreadnly`	|Boolean	|If set to `true` you can't change the text inside of editor.	|
|`Browser SpellCheck`	|Boolean	|If set to `True` it will use the browser’s native spell check functionality.	|
|`Status Bar`	|Boolean	|If set to `true` a small toolbar will appear.	|
|`Lite Version`	|Boolean	|If set to `true` you will have a lite version of toolbar. 	|
|`Dark Mode`	|Boolean	|If set to `true` the darkmode will be active.	|
|`Add Button`	|Boolean	|If set to `true` it will add a button that you can bind to onclick event. (it only work with Lite Version.)	|


## TODO

    - Finish Add button
