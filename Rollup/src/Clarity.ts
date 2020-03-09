import { NumberDictionary } from './ts/Types/NumberDictionary';
import { StringDictionary } from './ts/Types/StringDictionary';

export class Test {
    constructor() {
        this.Values= new NumberDictionary<string>();
        this.Values2=new StringDictionary<string>();
    }

    public Values: NumberDictionary<string>;
    public Values2: StringDictionary<string>;

    /**
     * UpdateValues
     */
    public UpdateValues(Item1:string,Item2:string) {
        this.Values[Item1]=Item2+"c";
    }
}