<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { VBtn } from 'vuetify/components/VBtn'

const trianglify = (window as any).trianglify
const presetColor = trianglify.utils.colorbrewer

const dpr = window.devicePixelRatio || 1
const wrap = ref<HTMLElement>()
const width = ref(500)
const height = ref(500)
const xColors = ref<any>('YlGn')

watch([width, height, xColors] as const, () => {
  genImg()
})

onMounted(genImg)

function genImg() {
  const pattern = trianglify({
    width: width.value,
    height: height.value,
    cellSize: 75,
    variance: 0.75,
    seed: null,
    xColors: presetColor[xColors.value],
    yColors: 'match',
    fill: true,
    palette: trianglify.colorbrewer,
    colorSpace: 'lab',
    colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
    strokeWidth: 0,
    points: null,
  })
  const canvas = pattern.toCanvas()

  while (wrap.value?.firstChild)
    wrap.value?.removeChild(wrap.value.firstChild)

  wrap.value?.appendChild(canvas)
}

function handleExport() {
  const canvas = document.querySelector('.gen-image__right-content canvas') as any

  if (canvas) {
    const image = new Image()
    const dataURL = canvas.toDataURL('image/png')
    image.src = dataURL
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `${width.value * dpr}x${height.value * dpr}.png`
    link.click()
  }
}

function handleSelectColor(key: any) {
  xColors.value = key
}
</script>

<template>
  <div class="gen-image flex">
    <div class="gen-image__left flex-shrink-0 p-4 bg-white">
      <div class="flex gap-4">
        <v-text-field v-model="width" label="宽度" variant="outlined" />
        <v-text-field v-model="height" label="高度" variant="outlined" />
      </div>
      <VBtn block size="large" class="mb-4" @click="genImg">
        生成
      </VBtn>
      <div
        v-for="(val, key) in presetColor"
        :key="key"
        class="gen-image__color-row"
        :class="[{ active: xColors === key }]" @click="handleSelectColor(key)"
      >
        <span
          v-for="color in val"
          :key="color"
          class="gen-image__color-row-item"
          :style="{ backgroundColor: color, width: `calc(100% / ${val.length})`, paddingTop: `calc(100% / ${val.length})` }"
        />
      </div>
    </div>
    <div class="gen-image__right flex-1 p-4 flex items-center justify-center">
      <div ref="wrap" class="gen-image__right-content" />
      <VBtn size="large" rounded="xl" class="gen-image__right-export-button my-4" @click="handleExport">
        导出图片
      </VBtn>
    </div>
  </div>
</template>

<style scoped>
.gen-image {
  display: flex;
  height: 100vh;
}
.gen-image__left{
  width: 400px;
  height: 100vh;
  overflow-y: auto;
}
.gen-image__button {
  width: 100%;
  height: 36px;
  border: 1px solid;
}
.gen-image__color-row {
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid transparent;
  cursor: pointer;
}
.gen-image__color-row.active {
  border-color: #374749;
}
.gen-image__color-row-item {
  height: 0;
}
.gen-image__right {
  position: relative;
  width: calc(100vw - 400px);
  height: 100vh;
}
.gen-image__right-content {
  max-width: calc(100% - 100px);
  display: flex;
}
.gen-image__right:deep(canvas) {
  max-width: 100%;
  max-height: calc(100vh - 200px);
  flex: 1;
  height: auto;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, .2));
}
.gen-image__right-export-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
