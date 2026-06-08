<script setup>
import { computed } from "vue";
import { marked } from "marked";

import CycleEvent from "../../models/CycleEvent";
import Datasource from "../../stores/datasource.js";
import pboGlyph from "../../assets/pbo-glyph.svg?url";
import LoadingIndicator from "../LoadingIndicator.vue";

const store = Datasource();
const language = computed(() => store.language);
const strings = computed(() => store.strings);

const fincyable = computed(() => {
  const fincy = props.fincy;

  if (!fincy) return null;

  const fincyable = fincy.publication ? fincy.publication : fincy.blog;

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
});

const props = defineProps({
  fincy: {
    type: Object,
    required: true,
  },
});

const openFincyable = (e) => {
  window.location.href = fincyable.value.permalink;
};
</script>

<template>
  <div class="rounded-sm bg-teal-900 p-2">
    <LoadingIndicator
      v-if="!fincy"
      class="size-8 text-white"
    ></LoadingIndicator>
    <div v-else class="flex flex-col gap-2">
      <div class="flex flex-row items-center gap-2 font-semibold">
        <img
          :src="pboGlyph"
          class="size-4"
          alt=""
          style="filter: grayscale(1) brightness(3)"
        />
        {{
          fincyable
            ? strings[`fincyable_label_${fincyable.type}`]
            : strings[`fincyable_label_generic`]
        }}
      </div>

      <div class="border-l-2 border-solid border-teal-700 pl-2">
        <figure
          role="link"
          tabindex="0"
          v-if="fincyable"
          class="flex h-full cursor-pointer flex-row gap-2"
          @click="openFincyable"
        >
          <div
            v-if="
              fincyable.coverpages &&
              fincyable.coverpages.distribution[language].small
            "
            class="h-fit w-16 shadow-xs"
          >
            <img
              :src="fincyable.coverpages.distribution[language].small"
              alt=""
            />
          </div>
          <div class="flex w-full flex-col justify-center gap-0.5">
            <aside
              class="flex flex-col flex-wrap justify-start gap-x-2 text-xs text-white md:flex-row md:items-center"
            >
              {{
                fincyable.release_date.toLocaleDateString(`${language}-CA`, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </aside>
            <a
              :href="fincyable.permalink"
              class="justify-start text-sm leading-tight font-semibold text-white underline md:flex-row md:items-center"
            >
              {{ fincyable[`title_${language}`] }}</a
            >

            <div
              v-if="fincyable.abstract"
              v-html="fincyable.abstract"
              class="text-xs leading-tight text-white"
            ></div>
          </div>
        </figure>
        <div v-else class="italic">
          {{ strings[`upcoming_report_long_label`] }}
        </div>
      </div>
    </div>
  </div>
</template>
