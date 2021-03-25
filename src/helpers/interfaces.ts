export interface InterfacePokemon {
    dexNr: number;
    generation: number;
    name: string;
    color: string;
    isNfe: boolean;
    isUber: boolean;
    isForm: boolean;
    types: string[];
    spriteSuffix?: string;
}
