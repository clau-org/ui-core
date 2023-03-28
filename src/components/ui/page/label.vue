<template>
  <div>
    <!-- Iterate over the pageLabels array -->
    <div v-for="pageLabel in pageLabels" :key="pageLabel.id">
      <!-- Check if the pageLabel should be shown -->
      <div v-if="getIfShouldShow(pageLabel)">
        <!-- Expose a slot named "child" with the props "pageLabel" and "index" -->
        <slot name="child" v-bind="{ pageLabel, index }"></slot>
      </div>

      <div v-else>
        <!-- Use the HeadlessDisclosure component to show the pageLabel with subPageLabels -->
        <HeadlessDisclosure v-slot="{ open: headlessOpen }">
          <HeadlessDisclosureButton>
            <!-- Expose a slot named "parent" with the props "open", "pageLabel", and "index" -->
            <slot
              name="parent"
              v-bind="{ open: headlessOpen, pageLabel, index }"
            ></slot>
          </HeadlessDisclosureButton>

          <HeadlessDisclosurePanel>
            <!-- Re-invoke the UiPageLabel component recursively to show subPageLabels -->
            <UiPageLabel
              :pageLabels="pageLabel.subPageLabels"
              :index="getIndexValue()"
            >
              <!-- Expose a slot named "child" with the props "pageLabelReinvocation" and "indexReinvocation" -->
              <template
                #child="{
                  pageLabel: pageLabelReinvocation,
                  index: indexReinvocation,
                }"
              >
                <slot
                  name="child"
                  v-bind="{
                    pageLabel: pageLabelReinvocation,
                    index: indexReinvocation,
                  }"
                ></slot>
              </template>

              <!-- Expose a slot named "parent" with the props "openReinvocation", "pageLabelReinvocation", and "indexReinvocation" -->
              <template
                #parent="{
                  open: openReinvocation,
                  pageLabel: pageLabelReinvocation,
                  index: indexReinvocation,
                }"
              >
                <slot
                  name="parent"
                  v-bind="{
                    open: openReinvocation,
                    pageLabel: pageLabelReinvocation,
                    index: indexReinvocation,
                  }"
                ></slot>
              </template>
            </UiPageLabel>
          </HeadlessDisclosurePanel>
        </HeadlessDisclosure>
      </div>
    </div>
  </div>
</template>

<script setup>
// Function to determine if the pageLabel should be shown
const getIfShouldShow = (pageLabel) => pageLabel.subPageLabels.length === 0

// Define the props for the component
const props = defineProps({
  pageLabels: {
    type: Object,
  },
  index: {
    type: Number,
    default: 1,
  },
})

// Function to get the index value
function getIndexValue() {
  return props.index + 1
}
</script>
