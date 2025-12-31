import { ref } from "vue";

export enum PageId {
    TableOfContents,
    Welcome,
    Emitter,
    FileExplorer,
}

export const currentPage = ref<PageId>(PageId.Welcome);

export function pageSwapTo(page: PageId) {
    currentPage.value = page;
}
