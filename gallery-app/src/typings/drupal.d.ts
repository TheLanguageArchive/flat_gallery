interface DrupalInterface {
    behaviors: {
        [name: string]: {
            attach: (context: any, settings: {[k: string]: any}) => any
            detach: (context: any) => any;
        }
    }

    IslandoraOpenSeadragonViewer: [] | null | undefined;
}

declare const Drupal: DrupalInterface;
