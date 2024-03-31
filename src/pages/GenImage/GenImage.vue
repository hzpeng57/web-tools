<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import trianglify from 'trianglify'
import { PresetColor } from './config'

const wrap = ref<HTMLElement>()
const width = ref(500)
const height = ref(500)

function genImg() {
  const pattern = trianglify({
    width: width.value,
    height: height.value,
    cellSize: 75,
    variance: 0.75,
    seed: null,
    xColors: PresetColor.Blues,
    yColors: 'match',
    fill: true,
    palette: trianglify.colorbrewer,
    colorSpace: 'lab',
    colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
    strokeWidth: 0,
    points: null,
  })

  while (wrap.value?.firstChild)
    wrap.value?.removeChild(wrap.value.firstChild)
  wrap.value?.appendChild((pattern as any).toCanvas())
}

watch([width, height] as const, () => {
  genImg()
})

onMounted(genImg)

function handleExport() {
  const canvas = document.querySelector('.gen-image__right-content canvas') as any

  if (canvas) {
    const image = new Image()
    const dataURL = canvas.toDataURL('image/png')
    image.src = dataURL
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `${width.value}x${height.value}.png`
    link.click()
  }
}
</script>

<template>
  <div class="gen-image flex">
    <div class="gen-image__left flex-shrink-0 p-4 bg-white">
      <div class="flex gap-4">
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">宽度</label>
          <input v-model="width" type="text" class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
        <div>
          <label class="block text-sm font-medium leading-6 text-gray-900">高度</label>
          <input v-model="height" type="text" class="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <button class="gen-image__button mt-5 border-slate-400" @click="genImg">
        生成
      </button>
    </div>
    <div class="gen-image__right flex-1 p-4 flex items-center justify-center">
      <div ref="wrap" class="gen-image__right-content" />
      <button class="gen-image__right-export-button border-slate-400" @click="handleExport">
        导出图片
      </button>
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
}
.gen-image__button {
  width: 100%;
  height: 36px;
  border: 1px solid;
  border-radius: 20px;
}
.gen-image__right {
  position: relative;
  width: calc(100vw - 400px);
  height: 100vh;
}
.gen-image__right-content {
  max-width: calc(100% - 100px);
  max-height: calc(100% - 100px);
  display: flex;
}
.gen-image__right:deep(canvas) {
  max-width: 100%;
  max-height: 100%;
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
  height: 36px;
  width: 160px;
  border: 1px solid;
  border-radius: 20px;
}
</style>
