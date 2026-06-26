<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { onUnmounted, ref } from "vue";

/**
 * Размер окна браузера часто нужен в интерфейсе:
 *
 * 1. Показать мобильную или десктопную версию блока.
 * 2. Пересчитать высоту панели.
 * 3. Спрятать часть UI на маленьком экране.
 *
 * Проблема: window.innerWidth сам по себе не реактивен.
 * Если просто прочитать его один раз, Vue не узнает о resize.
 */

/**
 * useWindowSize — готовый composable из VueUse.
 *
 * width и height — реактивные ref.
 * Они обновляются автоматически, когда пользователь меняет размер окна.
 */
const { width, height } = useWindowSize();

/**
 * Ниже та же задача, но без VueUse.
 *
 * Здесь всё нужно делать руками:
 * создать ref для ширины и высоты,
 * повесить обработчик window.addEventListener("resize"),
 * обновлять ref внутри обработчика,
 * удалить обработчик при уничтожении компонента.
 */
const nativeWidth = ref(window.innerWidth);
const nativeHeight = ref(window.innerHeight);

const updateNativeWindowSize = () => {
	nativeWidth.value = window.innerWidth;
	nativeHeight.value = window.innerHeight;
};

window.addEventListener("resize", updateNativeWindowSize);

onUnmounted(() => {
	window.removeEventListener("resize", updateNativeWindowSize);
});
</script>

<template>
	<section class="lesson">
		<h1>VueUse: useWindowSize</h1>

		<div class="workspace">
			<div class="code-block">
				<span>Размер окна через VueUse</span>
				<pre>
width: {{ width }}
height: {{ height }}</pre
				>
			</div>

			<div class="code-block code-block--success">
				<span>Что делает VueUse</span>
				<pre>
Следит за resize
Обновляет ref
Сам очищает listener</pre
				>
			</div>
		</div>

		<div class="workspace workspace--example">
			<div class="code-block">
				<span>Реализация руками</span>
				<pre>
width: {{ nativeWidth }}
height: {{ nativeHeight }}</pre
				>
			</div>

			<div class="code-block code-block--success">
				<span>Что нужно сделать вручную</span>
				<pre>
addEventListener
Обновить ref
removeEventListener</pre
				>
			</div>
		</div>
	</section>
</template>
