import { PathSelectHandler} from './src/PathSelectHandler'
import { PathManipulator } from './src/PathManipulator'

declare module '@svgdotjs/svg.js' {
    interface Path {
        showControls(): this
        showControls(enable: boolean): this
        showControls(handler: PathSelectHandler): this

        manipulate(): this
        manipulate(enable: boolean): this
        manipulate(handler: PathManipulator): this
    }
}