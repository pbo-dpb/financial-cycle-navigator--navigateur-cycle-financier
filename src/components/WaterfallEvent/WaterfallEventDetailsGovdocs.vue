<script setup>
    import govLogo from "../../assets/govlogo.svg?url";
    import govGlyph from "../../assets/gov-glyph.svg?url";

    import { computed } from "vue";
    import Datasource from "../../stores/datasource.js";
    import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline";
    const store = Datasource();

    import CycleEvent from "../../models/CycleEvent";
    const language = computed(() => store.language);
    const strings = computed(() => store.strings);

    const govdocs = computed(() => {
        return props.event.govdocs[language.value];
    });

    const props = defineProps({
        event: {
            type: CycleEvent,
            required: true,
        },
    });
</script>
<template>
    <div
        v-for="govdoc in govdocs"
        class="flex flex-col gap-2 rounded-sm bg-teal-900 p-2">
        <div class="flex flex-row items-center gap-2 font-semibold">
            <img
                :src="govGlyph"
                class="size-4"
                alt=""
                style="filter: grayscale(1) brightness(3)" />{{
                strings.government_document_label
            }}
        </div>

        <div class="border-l-2 border-solid border-teal-700 pl-2">
            <a
                :href="govdoc"
                target="_blank"
                role="link"
                tabindex="0"
                class="flex h-full cursor-pointer flex-row items-center gap-2"
                @click="openGovdoc(govdoc)">
                <div
                    class="flex h-20 w-16 bg-linear-to-br from-teal-600 to-teal-800 p-2 shadow-xs">
                    <img
                        :src="govLogo"
                        alt=""
                        class="place-center" />
                </div>

                <div
                    class="justify-start text-sm leading-tight font-semibold text-white underline md:flex-row md:items-center">
                    {{ event[`name_${language}`] }}
                    <ArrowTopRightOnSquareIcon class="inline-block size-4">
                    </ArrowTopRightOnSquareIcon>
                </div>
            </a>
        </div>
    </div>
</template>
