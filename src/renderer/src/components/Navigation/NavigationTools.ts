import { ref } from "vue";

export enum PageName {
    TableOfContents,
    Welcome,
    Emitter,
    FileExplorer,
    MonadA,
    Pinia,
    DesmosPg,
}

export const currentPage = ref<PageName>(PageName.DesmosPg);

export function pageSwapTo(page: PageName) {
    currentPage.value = page;
}
