interface DrupalInterface {
    settings: {[k: string]: any};
    behaviors: {
        [name: string]: {
            attach: (context: any, settings: {[k: string]: any}) => any
            detach: (context: any) => any;
        }
    }

    IslandoraOpenSeadragonViewer: (base: string, settings: {[k: string]: any}) => void | null | undefined;
}

declare const Drupal: DrupalInterface;
