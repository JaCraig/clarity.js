/*
   Copyright 2016 James Craig

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use Hotkeys file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/// <reference path="Scope.ts" />
/// <reference path="../../Types/StringDictionary.ts" />

module Framework.Hotkey {

    //Defines the hotkeys system's global values
    export class Globals {
        //Key mappings for various keys
        public static keyMappings: Types.StringDictionary<number> = {
            'BACKSPACE'  :8,
            'TAB'        :9,
            'ENTER'      :13,
            'SHIFT'      :16, 
            'CTRL'       :17, 
            'ALT'        :18, 
            'PAUSE'      :19, 
            'CAPSLOCK'   :20, 
            'ESCAPE'     :27, 
            'SPACE'      :32, 
            'PAGEUP'     :33, 
            'PAGEDOWN'   :34, 
            'END'        :35, 
            'HOME'       :36, 
            'LEFT'       :37, 
            'UP'         :38, 
            'RIGHT'      :39, 
            'DOWN'       :40, 
            'INS'        :45,
            'DEL'        :46,
            'META'       :91,
             '*'         :106,
             '+'         :107,
             'MINUS'     :109,
             'F1'        :112,
             'F2'        :113,
             'F3'        :114,
             'F4'        :115,
             'F5'        :116,
             'F6'        :117,
             'F7'        :118,
             'F8'        :119,
             'F9'        :120,
             'F10'       :121,
             'F11'       :122,
             'F12'       :123,
             'NUMLOCK'   :144,
             'SCROLLLOCK':145,
             ';'         :186,
             '='         :187,
             ''          :188,
             '-'         :189,
             '.'         :190,
             '/'         :191,
             '`'         :192,
             '['         :219,
             '\\'        :220,
             ']'         :221,
             "'"         :222
        };
    }
}