# svg.patheditor.js
An extension for [svg.js](https://github.com/svgdotjs/svg.js) which allows editing paths with the mouse (Inspired by [@svgdotjs/svg.select.js](https://github.com/svgdotjs/svg.select.js) and [@svgdotjs/svg.resize.js](https://github.com/svgdotjs/svg.resize.js)).

<center><img src="./overview.png?sanitize=true" style="width: 900px;" alt="overview"/></center>
<br />

## Getting Started

- Install `svg.js` and `svg.select.js` using npm:

  ```bash
  npm i @svgdotjs/svg.js svg.patheditor.js
  ```
<br/>

- Or get it from a cnd:

  ```html
  <script src="https://unpkg.com/@svgdotjs/svg.js"></script>
  <script src="https://unpkg.com/svg.patheditor.js"></script>
  ```
<br/>

## Demo

Fork the repo, clone it, run `npm install` and `npm run dev` to try it out.

## Usage

- Use `showControls` on a path to show the control points and handles:

  ```ts
  var canvas = new SVG().addTo('body').size(500, 500)
  let path = canvas.path('M10 50 C50 100 100 10 100 50').showControls()
  ```
<br/>

- Use `manipulate` to allow dragging around the control points and handles:

  ```ts
  var canvas = new SVG().addTo('body').size(500, 500)
  let path = canvas.path('M10 50 C50 100 100 10 100 50').showControls().manipulate()
  ```
<br/>

- To disable, pass false to either `showControls` or `manipulate`:

  ```ts
  path.manipulate(false)
  path.showControls(false)
  ```
<br/>

## Adaptation

You can pass in your own `PathSelectHandler` or `PathManipulator` (warning: this feature may disappear)

You can override the styles of the control points, control handles and their stalks with the following classes:

<center><img src="./base-classes.png?sanitize=true" style="width: 300px;" alt="base classes"/></center>

For Arcs, we have control handles for rx, ry and the arc's rotation

<center><img src="./arc.png?sanitize=true" style="width: 300px;" alt="base classes"/></center>

Each control point and handle also gets a `cpid` identifier attribute composed of the segment (path command) number and the point's purpose. For this, we follow the naming conventions of the SVG specification in [Chapter 9: Paths](https://www.w3.org/TR/SVG/paths.html).

E.g. the path shown above is an absolute cubic Bézier curve with the following definition:

```js
M10 50 C50 100 100 10 100 50
```

There are two segments (path commands) in this path: an absolute `moveto` *M* and an absolute `cubic Bézier curve` *C*.

In the specs, *M* has an x and y argument, and *C* has x1 y1 x2 y2 x and y arguments. This is reflected in the `cpid` attributes places on the controls:

<center><img src="./cpids.png?sanitize=true" style="width: 400px;max-width: 400px" alt="cpid attributes"/></center>

We add additional classes to reflect the type of control

<center><img src="./additional-classes.png?sanitize=true" style="width: 400px;max-width: 400px" alt="additional classes"/></center>


## Issues and open points

- We currently handle only one set of arguments per segment.
E.g. for the example path, we only have M x y and C x1 y1 x2 y2 x y, but the path specification allows multiple sets of arguments: M (x y)+ and C (x1 y1 x2 y2 x y)+  
**Fixing this will affect the format of the `cpid` attribute values**
<br /><br />
- Smooth quadratic curves (`T` or `t`) don't have their own control handles as the control point is assumed to be the reflection of the control point on the previous command relative to the current point.<br />
We draw this reflected point in gray, but unfortunately, these reflected points are not always drawn in the correct position. To be fixed.

<center><img src="./QT.png?sanitize=true" style="width: 200px;max-width: 200px" alt="additional classes"/></center>

- Currently the only way to affect the manipulation is to pass your own PathManipulation class. We plan to replace this with callbacks so you can e.g. limit movement of the control points and handles to the horizontal or the vertical axis; constraint the manipulations to a grid; etc