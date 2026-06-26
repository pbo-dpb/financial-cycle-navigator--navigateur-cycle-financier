<script setup>
    import { computed } from "vue";
    import { marked } from "marked";

    import CycleEvent from "../../models/CycleEvent";
    import Datasource from "../../stores/datasource.js";
    import pboGlyph from "../../assets/pbo-glyph.svg?url";
    import LoadingIndicator from "../LoadingIndicator.vue";

    const store = Datasource();
    const fincies = computed(() => store.fincies);
    const language = computed(() => store.language);
    const strings = computed(() => store.strings);

    const props = defineProps({
        event: {
            type: CycleEvent,
            required: true,
        },
    });

    const finciesByEvent = computed(() => {
        if (!Array.isArray(fincies.value)) return null;

        return fincies.value.filter(
            (fincy) => fincy.document_type === props.event.fincy_document_type,
        );
    });

    const fincyables = computed(() => {
        if (!Array.isArray(finciesByEvent.value)) return null;

        return finciesByEvent.value
            .map((fincy) => {
                const fincyable = fincy.publication
                    ? fincy.publication
                    : fincy.blog;

                if (!fincyable) return null;

                let abstract;

                if (fincyable[`abstract_${language.value}`]) {
                    abstract = fincyable[`abstract_${language.value}`];
                } else if (
                    fincyable.metadata &&
                    fincyable.metadata[`abstract_${language.value}`]
                ) {
                    abstract = fincyable.metadata[`abstract_${language.value}`];
                }

                return {
                    ...fincyable,
                    type: fincy.blog ? "BLOG" : fincy.publication.type,
                    release_date: new Date(fincyable.release_date),
                    abstract: abstract ? marked(abstract) : null,
                    permalink: fincyable.permalinks[language.value].website,
                };
            })
            .filter(Boolean);
    });

    const fincyableLabel = computed(() => {
        const first = fincyables.value[0];

        if (!first) {
            return strings.value["fincyable_label_generic"];
        }

        return strings.value[`fincyable_label_${first.type}`];
    });

    const openFincyable = (fincyable) => {
        window.location.href = fincyable.permalink;
    };
</script>

<template>
    <div
        v-if="fincyables === null"
        class="rounded-sm bg-teal-900 p-2">
        <LoadingIndicator class="size-8 text-white" />
    </div>
    <div v-else-if="fincyables.length">
        <div class="rounded-sm bg-teal-900 p-2">
            <div class="flex flex-col gap-4">
                <div class="flex flex-row items-center gap-2 font-semibold">
                    <img
                        :src="pboGlyph"
                        class="size-4"
                        alt=""
                        style="filter: grayscale(1) brightness(3)" />
                    {{ fincyableLabel }}
                </div>
                <div
                    v-if="fincyables.length"
                    class="flex flex-col gap-4">
                    <div
                        v-for="fincyable in fincyables"
                        :key="fincyable.permalink"
                        class="border-l-2 border-solid border-teal-700 pl-2">
                        <figure
                            role="link"
                            tabindex="0"
                            @click="openFincyable(fincyable)"
                            class="flex h-full cursor-pointer flex-row gap-2">
                            <div
                                v-if="
                                    fincyable.coverpages &&
                                    fincyable.coverpages.distribution[language]
                                        .small
                                "
                                class="h-fit w-16 shadow-xs">
                                <img
                                    :src="
                                        fincyable.coverpages.distribution[
                                            language
                                        ].small
                                    "
                                    alt="" />
                            </div>
                            <div
                                class="flex w-full flex-col justify-center gap-0.5">
                                <aside
                                    class="flex flex-col flex-wrap justify-start gap-x-2 text-xs text-white md:flex-row md:items-center">
                                    {{
                                        fincyable.release_date.toLocaleDateString(
                                            `${language}-CA`,
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            },
                                        )
                                    }}
                                </aside>
                                <a
                                    :href="fincyable.permalink"
                                    class="justify-start text-sm leading-tight font-semibold text-white underline md:flex-row md:items-center">
                                    {{ fincyable[`title_${language}`] }}</a
                                >
                                <div
                                    v-if="fincyable.abstract"
                                    v-html="fincyable.abstract"
                                    class="text-xs leading-tight text-white"></div>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else
        class="italic">
        {{ strings[`upcoming_report_long_label`] }}
    </div>
</template>
