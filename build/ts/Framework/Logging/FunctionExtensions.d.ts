import { Signature } from './Signature.ts';
declare global {
    interface Function {
        trace(): any[];
        signature(): Signature;
        getName(): any;
    }
}
