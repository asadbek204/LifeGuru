import Node, { Icon } from "../../components/ViewNode/Node"

type THead = {
    icon: Icon
    next?: Node
}


export default class ViewPort {
    head: THead = { icon: new Icon( { url: "", width: 100, height: 100 } ) }
}