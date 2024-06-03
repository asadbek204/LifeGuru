
export type TIcon = {
    url: string
    width: number
    height: number
}

export class Icon  {
    url: string
    width: number
    height: number

    constructor( { url, width, height }: TIcon ) {
        this.url = url
        this.width = width
        this.height = height
    }
}

export type TNode = {
    name: string
    title: string
    icon: Icon
    description: string
}

class Node {
    name: string
    private title: string
    private icon: Icon
    private description: string
    prev?: Node = undefined
    next?: Node = undefined
    
    constructor( { name, title, icon, description }: TNode ) {
        this.name = name
        this.title = title
        this.icon = icon
        this.description = description
    }

    info = () => ( { title: this.title, icon: this.icon, description: this.description } )
}

export default Node