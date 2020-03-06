interface NodeList {
    map<TResult>(callback: (x: Node) => TResult): TResult[];
    filter(callback: (x: Node) => boolean): Node[];
}
