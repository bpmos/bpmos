
export interface Package {
    name: string;
    rootPath: string;
    remotes?: any;
}

export interface Application extends Package {
    languages: Language[],
    title: I18N,
    icon: Icon;
}

export interface I18N {
    [index: string]: string;
}

export type Iso_639_1 = 'en' | 'pt' | 'pt_br';

export interface Language {
    iso_639_1: Iso_639_1;
}

export interface Icon {

}